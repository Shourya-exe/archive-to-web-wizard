import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Horizontal snap-scrolling row with round arrow buttons on desktop. */
export function ScrollRow({ children, className, itemClassName }: { children: ReactNode[]; className?: string; itemClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className={cn("relative", className)}>
      <div ref={ref} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:scroll-px-0 md:px-0">
        {children.map((child, i) => (
          <div key={i} className={cn("shrink-0 snap-start", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        className="absolute -left-5 top-[38%] hidden size-11 -translate-y-1/2 place-items-center rounded-full border bg-card text-foreground shadow-card transition hover:shadow-lift md:grid"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        className="absolute -right-5 top-[38%] hidden size-11 -translate-y-1/2 place-items-center rounded-full border bg-card text-foreground shadow-card transition hover:shadow-lift md:grid"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
