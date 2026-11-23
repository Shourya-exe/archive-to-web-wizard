import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { AREAS, SERVICE_BY_ID, formatPrice } from "@/lib/catalog";
import { formatDateLong, useCart } from "@/lib/cart";
import { isValidMobile, isWestBengalPincode } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Confirm your booking — ServiceLane" },
      { name: "description", content: "Add your details and address, then pay in advance to confirm your ServiceLane booking." },
      { property: "og:title", content: "Confirm your booking — ServiceLane" },
      { property: "og:description", content: "Secure checkout for ServiceLane home services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const METHODS = [
  { id: "UPI", label: "UPI", sub: "GPay, PhonePe, Paytm or any UPI app" },
  { id: "Card", label: "Credit / Debit card", sub: "Visa, Mastercard, RuPay" },
  { id: "NetBanking", label: "NetBanking", sub: "All major West Bengal and national banks" },
];

type Errors = Partial<Record<"name" | "phone" | "pincode" | "address", string>>;

const inputCls =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40";

function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", area: AREAS[1] ?? "Salt Lake", pincode: "", address: "" });
  const [method, setMethod] = useState("UPI");
  const [errors, setErrors] = useState<Errors>({});
  const [paying, setPaying] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name";
    if (!isValidMobile(form.phone)) next.phone = "Enter a valid 10-digit mobile number";
    if (!isWestBengalPincode(form.pincode)) next.pincode = "Enter a West Bengal pincode (700xxx – 743xxx)";
    if (form.address.trim().length < 6) next.address = "Add your flat, street and a landmark";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPaying(true);
    // Payment gateway is not connected yet; the booking is confirmed directly.
    setTimeout(() => {
      cart.placeOrder({ ...form, name: form.name.trim(), method });
      navigate({ to: "/bookings" });
    }, 700);
  };

  if (cart.hydrated && cart.lines.length === 0 && !paying) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-extrabold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add a service to book a visit.</p>
        <Button asChild variant="cta" size="lg" className="mt-6">
          <Link to="/services">Browse services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-surface">
      <div className="border-b bg-card">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <ol className="flex items-center gap-2 text-sm font-semibold sm:gap-4">
            <Step n={<Check className="size-4" />} label="Cart" state="done" />
            <Step n="2" label="Details & payment" state="now" />
            <Step n="3" label="Confirmation" state="todo" />
          </ol>
          <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Lock className="size-4" /> Secure checkout
          </span>
        </div>
      </div>

      <form onSubmit={submit} noValidate className="container-page py-10">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="size-4" /> Back to cart
        </Link>
        <h1 className="mt-3 text-4xl font-extrabold text-foreground">Confirm your booking</h1>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-5">
            <Card title="Your details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" className={inputCls} />
                </Field>
                <Field label="Mobile number" error={errors.phone}>
                  <div className="flex">
                    <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-input bg-muted px-3 font-semibold text-ink-soft">+91</span>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                      inputMode="numeric"
                      placeholder="10-digit number"
                      autoComplete="tel-national"
                      className={cn(inputCls, "rounded-l-none")}
                    />
                  </div>
                </Field>
              </div>
            </Card>

            <Card title="Service address">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Area">
                  <select value={form.area} onChange={set("area")} className={cn(inputCls, "cursor-pointer")}>
                    {AREAS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Pincode" error={errors.pincode}>
                  <input
                    value={form.pincode}
                    onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                    inputMode="numeric"
                    placeholder="700xxx – 743xxx"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="House / flat, street, landmark" error={errors.address} className="mt-4">
                <textarea
                  value={form.address}
                  onChange={set("address")}
                  rows={3}
                  placeholder="Flat no., building, street, nearby landmark"
                  className={cn(inputCls, "h-auto py-3")}
                />
              </Field>
            </Card>

            <div className="flex items-center gap-4 rounded-3xl border bg-card p-5 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <CalendarDays className="size-5" />
              </span>
              <div className="flex-1">
                <p className="font-bold text-foreground">{cart.dateISO ? formatDateLong(cart.dateISO) : "Pick a date"}</p>
                <p className="text-sm text-muted-foreground">Slot: {cart.slot}</p>
              </div>
              <Link to="/services" className="text-sm font-bold text-primary hover:underline">
                Change
              </Link>
            </div>

            <Card title="Pay in advance" sub="The full amount is paid now through a secure payment pop-up.">
              <div role="radiogroup" className="space-y-3">
                {METHODS.map((m) => {
                  const on = method === m.id;
                  return (
                    <label
                      key={m.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition",
                        on ? "border-primary bg-primary-soft" : "border-input bg-card hover:border-primary/50",
                      )}
                    >
                      <input type="radio" name="method" value={m.id} checked={on} onChange={() => setMethod(m.id)} className="size-5 accent-[var(--primary)]" />
                      <span>
                        <span className="block font-bold text-foreground">{m.label}</span>
                        <span className="block text-sm text-muted-foreground">{m.sub}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </Card>
          </div>

          <aside className="rounded-3xl border bg-card p-6 shadow-card lg:sticky lg:top-24">
            <h2 className="text-xl font-extrabold text-foreground">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {cart.lines.map((l) => {
                const sv = SERVICE_BY_ID[l.id];
                if (!sv) return null;
                return (
                  <li key={l.id} className="flex justify-between gap-3 text-sm">
                    <span className="text-foreground">
                      {sv.title} <span className="text-muted-foreground">× {l.qty}</span>
                    </span>
                    <span className="font-bold text-foreground">{formatPrice(sv.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold text-foreground">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>
            <Button type="submit" variant="cta" size="xl" className="mt-5 w-full" disabled={paying}>
              {paying ? "Confirming…" : "Pay & Confirm Booking"} {!paying && <ArrowRight className="size-4" />}
            </Button>
            <p className="mt-4 rounded-2xl bg-surface p-4 text-sm text-muted-foreground">
              After payment you get a <strong className="text-foreground">Start Work OTP</strong> and your Project Manager's contact. Share the OTP only when work begins at your home.
            </p>
            <p className="mt-3 text-center text-xs text-muted-foreground">Payments processed securely by Razorpay</p>
          </aside>
        </div>
      </form>
    </div>
  );
}

function Step({ n, label, state }: { n: React.ReactNode; label: string; state: "done" | "now" | "todo" }) {
  return (
    <li className={cn("flex items-center gap-2", state === "todo" ? "text-muted-foreground" : "text-foreground")}>
      <span
        className={cn(
          "grid size-7 place-items-center rounded-full text-xs font-bold",
          state === "done" && "bg-success text-primary-foreground",
          state === "now" && "bg-primary text-primary-foreground",
          state === "todo" && "bg-border text-muted-foreground",
        )}
      >
        {n}
      </span>
      <span className={cn(state !== "now" && "hidden sm:inline")}>{label}</span>
    </li>
  );
}

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border bg-card p-6 shadow-card md:p-7">
      <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, error, className, children }: { label: string; error?: string | undefined; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}
