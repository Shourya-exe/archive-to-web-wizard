import { Minus, Plus } from "lucide-react";

import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

/** "Add" pill that turns into a − qty + stepper once the service is in the cart. */
export function AddButton({ id, className, size = "md" }: { id: string; className?: string; size?: "sm" | "md" }) {
  const { qtyOf, add, remove } = useCart();
  const qty = qtyOf(id);
  const h = size === "sm" ? "h-9 min-w-[88px]" : "h-10 min-w-[104px]";
  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(id)}
        className={cn(
          h,
          "rounded-xl border border-input bg-card px-4 text-sm font-bold text-primary shadow-card transition hover:border-primary hover:bg-primary-soft",
          className,
        )}
      >
        Add
      </button>
    );
  }
  return (
    <div className={cn(h, "inline-flex items-center justify-between rounded-xl bg-primary px-1 text-primary-foreground shadow-card", className)}>
      <button type="button" aria-label="Remove one" onClick={() => remove(id)} className="grid size-8 place-items-center rounded-lg hover:bg-on-dark/10">
        <Minus className="size-4" />
      </button>
      <span className="min-w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
      <button type="button" aria-label="Add one more" onClick={() => add(id)} className="grid size-8 place-items-center rounded-lg hover:bg-on-dark/10">
        <Plus className="size-4" />
      </button>
    </div>
  );
}
