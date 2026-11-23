import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { SERVICE_BY_ID, SLOTS } from "@/lib/catalog";
import { cartTotal, type CartLine } from "@/lib/pricing";

export type Order = {
  code: string;
  otp: string;
  items: { id: string; title: string; price: number; qty: number }[];
  total: number;
  dateISO: string;
  slot: string;
  name: string;
  phone: string;
  area: string;
  pincode: string;
  address: string;
  method: string;
  createdAt: string;
};

type CartState = {
  lines: CartLine[];
  dateISO: string | null;
  slot: string;
  hydrated: boolean;
  count: number;
  total: number;
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setDate: (iso: string) => void;
  setSlot: (slot: string) => void;
  lastOrder: Order | null;
  placeOrder: (o: Omit<Order, "code" | "otp" | "items" | "total" | "createdAt" | "dateISO" | "slot">) => Order;
};

const CartContext = createContext<CartState | null>(null);
const KEY = "servicelane.cart.v1";
const ORDER_KEY = "servicelane.lastOrder.v1";

export function upcomingDays(count = 5, from = new Date()) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from);
    d.setDate(d.getDate() + i + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
}

export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDateLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export function formatDateShort(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [dateISO, setDateISO] = useState<string | null>(null);
  const [slot, setSlotState] = useState<string>(SLOTS[1] ?? "11 AM – 1 PM");
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { lines?: CartLine[]; dateISO?: string | null; slot?: string };
        setLines((parsed.lines ?? []).filter((l) => SERVICE_BY_ID[l.id] && l.qty > 0));
        if (parsed.dateISO) setDateISO(parsed.dateISO);
        if (parsed.slot) setSlotState(parsed.slot);
      }
      const o = localStorage.getItem(ORDER_KEY);
      if (o) setLastOrder(JSON.parse(o) as Order);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ lines, dateISO, slot }));
  }, [lines, dateISO, slot, hydrated]);

  // Default to tomorrow once we're on the client.
  useEffect(() => {
    if (hydrated && !dateISO) {
      const first = upcomingDays(1)[0];
      if (first) setDateISO(toISODate(first));
    }
  }, [hydrated, dateISO]);

  const add = useCallback((id: string) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) =>
      prev.flatMap((l) => (l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const placeOrder: CartState["placeOrder"] = useCallback(
    (details) => {
      const items = lines
        .map((l) => {
          const sv = SERVICE_BY_ID[l.id];
          return sv ? { id: l.id, title: sv.title, price: sv.price, qty: l.qty } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);
      const order: Order = {
        ...details,
        items,
        total: cartTotal(lines, SERVICE_BY_ID),
        dateISO: dateISO ?? toISODate(new Date()),
        slot,
        code: `SL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        otp: String(Math.floor(1000 + Math.random() * 9000)),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      setLastOrder(order);
      setLines([]);
      return order;
    },
    [lines, dateISO, slot],
  );

  const value = useMemo<CartState>(
    () => ({
      lines,
      dateISO,
      slot,
      hydrated,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: cartTotal(lines, SERVICE_BY_ID),
      qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
      add,
      remove,
      clear,
      setDate: setDateISO,
      setSlot: setSlotState,
      lastOrder,
      placeOrder,
    }),
    [lines, dateISO, slot, hydrated, add, remove, clear, lastOrder, placeOrder],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
