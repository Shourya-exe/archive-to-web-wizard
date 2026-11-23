import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-ink">{eyebrow}</p>}
        <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-[40px]">{title}</h2>
        {sub && <p className="mt-2 text-base text-muted-foreground md:text-lg">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
