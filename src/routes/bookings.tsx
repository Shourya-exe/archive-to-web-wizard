import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MapPin, MessageCircle, Phone, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BRAND, formatPrice } from "@/lib/catalog";
import { formatDateShort, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My Bookings — ServiceLane" },
      { name: "description", content: "See your booking status, Start Work OTP and Project Manager contact." },
      { property: "og:title", content: "My Bookings — ServiceLane" },
      { property: "og:description", content: "Your ServiceLane booking, OTP and Project Manager in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingsPage,
});

const PM = { name: "Sourav Mitra", role: "Quality & Site Manager" }; // SAMPLE

function BookingsPage() {
  const { lastOrder: o, hydrated } = useCart();

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (!o) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-extrabold text-foreground">No bookings yet</h1>
        <p className="mt-2 text-muted-foreground">Once you book a service, your Start Work OTP and Project Manager appear here.</p>
        <Button asChild variant="cta" size="lg" className="mt-6">
          <Link to="/services">Book a Service</Link>
        </Button>
      </div>
    );
  }

  const track = [
    { label: "Confirmed", on: true },
    { label: "Work Started", on: false },
    { label: "Completed", on: false },
  ];

  return (
    <div className="bg-surface">
      <div className="container-page max-w-2xl py-10 md:py-14">
        <div className="flex items-center justify-between text-sm">
          <span className="font-extrabold text-primary">{BRAND.name}</span>
          <span className="text-muted-foreground">Order {o.code}</span>
        </div>

        <div className="mt-8 grid size-16 place-items-center rounded-full bg-primary text-accent">
          <Check className="size-8" strokeWidth={3} />
        </div>
        <h1 className="mt-5 text-4xl font-extrabold text-foreground">Booking confirmed</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Paid {formatPrice(o.total)} · {formatDateShort(o.dateISO)} · {o.slot}
        </p>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {track.map((t) => (
            <div key={t.label}>
              <div className={cn("h-1.5 rounded-full", t.on ? "bg-accent" : "bg-border")} />
              <p className={cn("mt-2 text-sm", t.on ? "font-extrabold text-foreground" : "font-semibold text-muted-foreground")}>{t.label}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-3xl bg-accent-soft p-6 text-center md:p-8">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent-ink">Start Work OTP</h2>
          <div className="mt-5 flex justify-center gap-3">
            {o.otp.split("").map((d, i) => (
              <span key={i} className="grid h-16 w-14 place-items-center rounded-2xl bg-card text-3xl font-extrabold text-foreground shadow-card">
                {d}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-sm text-accent-ink">Share this OTP with your Project Manager when work begins at your home.</p>
        </section>

        <section className="mt-5 rounded-3xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-primary-soft text-lg font-extrabold text-primary">
              {PM.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Your Project Manager</p>
              <p className="text-lg font-extrabold text-foreground">{PM.name}</p>
              <p className="text-sm text-muted-foreground">{PM.role}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button asChild variant="soft" size="lg">
              <a href={BRAND.supportPhoneHref}>
                <Phone /> Call
              </a>
            </Button>
            <Button asChild variant="soft" size="lg">
              <a href={BRAND.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border bg-card p-6 shadow-card">
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            {o.address}, {o.area} · {o.pincode}
          </p>
          <ul className="mt-4 divide-y border-t">
            {o.items.map((it) => (
              <li key={it.id} className="flex justify-between py-3 text-sm">
                <span className="text-foreground">
                  {it.title} {it.qty > 1 && <span className="text-muted-foreground">× {it.qty}</span>}
                </span>
                <span className="font-semibold text-foreground">{formatPrice(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t pt-4 text-lg font-extrabold text-foreground">
            <span>Total paid</span>
            <span>{formatPrice(o.total)}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Paid via {o.method} · Booked for {o.name}
          </p>
        </section>

        <Button variant="outline" size="xl" className="no-print mt-6 w-full" onClick={() => window.print()}>
          <Printer /> Download / Print Receipt
        </Button>
      </div>
    </div>
  );
}
