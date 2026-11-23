import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";

import { AddButton } from "@/components/site/AddButton";
import { Button } from "@/components/ui/button";
import { SERVICE_BY_ID, SLOTS, formatPrice } from "@/lib/catalog";
import { toISODate, upcomingDays, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartPanel({ className }: { className?: string }) {
  const { lines, total, dateISO, setDate, slot, setSlot, clear, hydrated } = useCart();
  const days = upcomingDays(5);

  return (
    <aside className={cn("rounded-3xl border bg-surface p-6 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-foreground">Your cart</h2>
        {lines.length > 0 && (
          <button type="button" onClick={clear} className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive">
            <Trash2 className="size-3.5" /> Clear
          </button>
        )}
      </div>

      {!hydrated || lines.length === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed bg-card px-4 py-8 text-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
            <ShoppingBag className="size-6" />
          </span>
          <p className="mt-3 text-sm font-semibold text-foreground">No services added yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Tap “Add” on any service to start your booking.</p>
        </div>
      ) : (
        <>
          <ul className="mt-4 space-y-3">
            {lines.map((l) => {
              const sv = SERVICE_BY_ID[l.id];
              if (!sv) return null;
              return (
                <li key={l.id} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{sv.title}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(sv.price * l.qty)}</p>
                  </div>
                  <AddButton id={l.id} size="sm" />
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-sm font-bold text-foreground">When should we come?</p>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {days.map((d) => {
              const iso = toISODate(d);
              const on = iso === dateISO;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setDate(iso)}
                  aria-pressed={on}
                  className={cn(
                    "flex flex-col items-center rounded-xl border py-2 transition",
                    on ? "border-primary bg-primary text-primary-foreground" : "bg-card text-foreground hover:border-primary",
                  )}
                >
                  <span className="text-[11px] font-medium opacity-80">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                  <span className="text-lg font-extrabold leading-tight">{d.getDate()}</span>
                </button>
              );
            })}
          </div>
          <label className="mt-2 block">
            <span className="sr-only">Time slot</span>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="h-11 w-full cursor-pointer rounded-xl border bg-card px-3 text-sm font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {SLOTS.map((sl) => (
                <option key={sl}>{sl}</option>
              ))}
            </select>
          </label>

          <div className="mt-5 flex items-end justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground">Total, paid in advance</span>
            <span className="text-2xl font-extrabold text-foreground">{formatPrice(total)}</span>
          </div>
          <Button asChild variant="cta" size="xl" className="mt-4 w-full">
            <Link to="/checkout">Continue to checkout</Link>
          </Button>
        </>
      )}
    </aside>
  );
}

/** Slim bar pinned above the phone nav so the cart is always reachable. */
export function MobileCartBar() {
  const { count, total, hydrated } = useCart();
  if (!hydrated || count === 0) return null;
  return (
    <div className="fixed inset-x-3 bottom-[84px] z-40 lg:hidden">
      <Link to="/checkout" className="flex items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-primary-foreground shadow-lift">
        <span className="text-sm font-semibold">
          {count} item{count > 1 ? "s" : ""} · {formatPrice(total)}
        </span>
        <span className="text-sm font-bold text-accent">Checkout →</span>
      </Link>
    </div>
  );
}
