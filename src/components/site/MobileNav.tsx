import { Link } from "@tanstack/react-router";
import { CalendarCheck, Home, LayoutGrid, Upload } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: LayoutGrid },
  { to: "/custom-projects", label: "Big jobs", icon: Upload },
  { to: "/bookings", label: "Bookings", icon: CalendarCheck },
] as const;

/** Floating bottom bar for phones. */
export function MobileNav() {
  return (
    <nav className="no-print fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl border bg-card/95 p-1.5 shadow-lift backdrop-blur md:hidden">
      {ITEMS.map(({ to, label, icon: I }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: to === "/" }}
          className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold text-muted-foreground"
          activeProps={{ className: "bg-primary-soft text-primary" }}
        >
          <I className="size-5" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
