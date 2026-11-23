import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/catalog";

export function FaqList({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="divide-y rounded-3xl border bg-card px-6 shadow-card">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`f${i}`} className="border-b-0">
          <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
