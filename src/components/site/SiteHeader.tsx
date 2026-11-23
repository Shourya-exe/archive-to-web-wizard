import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, MapPin, Search, ShoppingBag } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { AREAS } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/warranty", label: "Warranty" },
  { to: "/join-as-pro", label: "Join as a Pro" },
] as const;

export function SiteHeader() {
  const { count, hydrated } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [area, setArea] = useState(AREAS[0] ?? "Kolkata");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/services", search: q.trim() ? { q: q.trim() } : {} });
  };

  return (
    <header className="no-print sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-[72px] items-center gap-4 lg:gap-6">
        <Logo />
        <label className="relative hidden h-11 shrink-0 items-center gap-2 rounded-xl border border-input bg-card pl-3 pr-8 text-sm font-semibold text-foreground md:flex">
          <MapPin className="size-4 text-primary" aria-hidden="true" />
          <span className="sr-only">Your area</span>
          <select value={area} onChange={(e) => setArea(e.target.value)} className="h-full cursor-pointer appearance-none bg-transparent pr-1 outline-none">
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}, West Bengal
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 size-4 text-muted-foreground" aria-hidden="true" />
        </label>
        <form onSubmit={onSearch} className="hidden h-11 min-w-[160px] flex-1 items-center gap-2 rounded-xl bg-muted px-3.5 text-muted-foreground focus-within:ring-2 focus-within:ring-ring lg:flex">
          <Search className="size-4" aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search services"
            placeholder="Search for AC repair, bathroom cleaning, electrician..."
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </form>
        <nav className="ml-auto hidden items-center gap-5 whitespace-nowrap text-[15px] font-semibold text-ink-soft xl:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="transition hover:text-primary" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <Link to="/bookings" className="hidden whitespace-nowrap text-sm font-semibold text-primary hover:underline 2xl:block">
            My Bookings
          </Link>
          <Link to="/services" aria-label="Cart" className="relative grid size-11 place-items-center rounded-xl border bg-card text-primary transition hover:bg-primary-soft">
            <ShoppingBag className="size-5" />
            {hydrated && count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <Button asChild variant="cta" size="lg" className="hidden whitespace-nowrap sm:inline-flex">
            <Link to="/services">Book a Service</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
