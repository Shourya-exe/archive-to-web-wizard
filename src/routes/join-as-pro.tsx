import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, MapPinned, Wallet } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AREAS, BRAND, CATEGORIES, IMAGES } from "@/lib/catalog";
import { isValidMobile } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/join-as-pro")({
  head: () => ({
    meta: [
      { title: "Join as a Service Partner — ServiceLane" },
      { name: "description", content: "Skilled technician or home-care professional? Get steady local bookings, transparent payouts and flexible schedules." },
      { property: "og:title", content: "Become a ServiceLane Partner" },
      { property: "og:description", content: "Steady local bookings, transparent payouts and flexible schedules across West Bengal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JoinPage,
});

const inputCls =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40";

function JoinPage() {
  const [form, setForm] = useState({ name: "", phone: "", trade: CATEGORIES[0]?.shortTitle ?? "", area: AREAS[0] ?? "Kolkata" });
  const [error, setError] = useState<string | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!isValidMobile(form.phone)) return setError("Enter a valid 10-digit mobile number.");
    setError(null);
    toast.success("Thanks! Our partner team will call you to schedule verification.");
    setForm({ ...form, name: "", phone: "" });
  };
  const perks = [
    { icon: MapPinned, title: "Steady local bookings", text: "Jobs near you across West Bengal." },
    { icon: Wallet, title: "Transparent payouts", text: "Rate-card pricing, no haggling." },
    { icon: CalendarClock, title: "Flexible schedules", text: "Choose the slots you want to work." },
  ];
  return (
    <section className="bg-surface">
      <div className="container-page grid items-start gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-[52px]">Skilled Technician or Home-Care Professional?</h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Partner with {BRAND.name} for steady local bookings, transparent payouts, and flexible schedules.
          </p>
          <div className="mt-8 overflow-hidden rounded-3xl">
            <img src={IMAGES.carpenter} alt="A ServiceLane carpenter assembling a wardrobe" className="aspect-[16/10] w-full object-cover" />
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {perks.map(({ icon: I, title, text }) => (
              <li key={title}>
                <I className="size-6 text-primary" aria-hidden="true" />
                <p className="mt-2 font-bold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} noValidate className="rounded-3xl border bg-card p-6 shadow-lift md:p-8 lg:sticky lg:top-24">
          <h2 className="text-2xl font-extrabold text-foreground">Register as a Service Partner</h2>
          <p className="mt-1 text-sm text-muted-foreground">Takes a minute. We'll call you for ID and skill verification.</p>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Full name</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Mobile number</span>
              <div className="flex">
                <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-input bg-muted px-3 font-semibold text-ink-soft">+91</span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  inputMode="numeric"
                  placeholder="10-digit number"
                  className={cn(inputCls, "rounded-l-none")}
                />
              </div>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Your trade</span>
              <select value={form.trade} onChange={(e) => setForm({ ...form, trade: e.target.value })} className={cn(inputCls, "cursor-pointer")}>
                {CATEGORIES.map((c) => (
                  <option key={c.slug}>{c.shortTitle}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Area</span>
              <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={cn(inputCls, "cursor-pointer")}>
                {AREAS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </label>
          </div>
          {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}
          <Button type="submit" variant="cta" size="xl" className="mt-6 w-full">
            Register as a Service Partner
          </Button>
        </form>
      </div>
    </section>
  );
}
