import { Clock } from "lucide-react";

import { AddButton } from "@/components/site/AddButton";
import { formatPrice, type Service } from "@/lib/catalog";

/** Photo-first service card with the Add control floating on the image corner. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group w-full">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
          <img src={service.image} alt={service.title} loading="lazy" className="zoom-on-hover size-full object-cover" />
        </div>
        <div className="absolute -bottom-4 right-3">
          <AddButton id={service.id} size="sm" />
        </div>
      </div>
      <h3 className="mt-6 text-[15px] font-bold leading-snug text-foreground">{service.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Clock className="size-3.5" aria-hidden="true" /> {service.duration}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {service.price === 0 ? "" : service.priceLead}{" "}
        <span className="text-base font-bold text-foreground">{formatPrice(service.price)}</span>
      </p>
    </article>
  );
}
