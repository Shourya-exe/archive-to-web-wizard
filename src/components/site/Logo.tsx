import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

import { BRAND } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5 font-extrabold text-xl tracking-tight", onDark ? "text-on-dark" : "text-primary", className)}>
      <span className={cn("grid size-9 place-items-center rounded-xl", onDark ? "bg-on-dark/10 text-accent" : "bg-primary text-accent")}>
        <Home className="size-5" strokeWidth={2.2} aria-hidden="true" />
      </span>
      {BRAND.name}
    </Link>
  );
}
