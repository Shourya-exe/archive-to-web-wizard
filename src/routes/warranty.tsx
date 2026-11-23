import { createFileRoute, Link } from "@tanstack/react-router";

import { FaqList } from "@/components/site/FaqList";
import { Icon } from "@/components/site/Icon";
import { Button } from "@/components/ui/button";
import { BRAND, FAQS, IMAGES } from "@/lib/catalog";

export const Route = createFileRoute("/warranty")({
  head: () => ({
    meta: [
      { title: "Service Warranty & Protection — ServiceLane" },
      { name: "description", content: "Eligible ServiceLane jobs carry a post-service warranty plus protection against accidental service damage." },
      { property: "og:title", content: "Service Warranty & Protection — ServiceLane" },
      { property: "og:description", content: "Free revisits if the same issue returns, plus damage cover on eligible jobs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WarrantyPage,
});

function WarrantyPage() {
  const points = [
    { icon: "shield" as const, title: `${BRAND.warrantyDays}-day post-service warranty`, text: "If the same issue returns on an eligible job, raise a revisit from your booking and we fix it at no extra labor cost." },
    { icon: "rupee" as const, title: `Up to ${BRAND.coverageAmount} damage cover`, text: "Protection against accidental damage caused during the service visit." },
    { icon: "userCheck" as const, title: "Verified, accountable pros", text: "Every visit starts with your Start Work OTP, so you always know who is working in your home." },
    { icon: "clock" as const, title: "Free rescheduling", text: `Reschedule or cancel up to ${BRAND.cancellationWindow} before your slot with zero penalty.` },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        <img src={IMAGES.electrician} alt="" className="absolute inset-0 size-full object-cover object-top" />
        <div className="photo-fade absolute inset-0" />
        <div className="container-page relative py-20 md:py-28">
          <span className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <Icon name="shield" className="size-7" />
          </span>
          <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight text-on-dark md:text-[54px]">Protected Service, Every Time</h1>
          <p className="mt-4 max-w-lg text-lg text-on-dark-muted">
            {BRAND.warrantyDays}-day warranty & {BRAND.coverageAmount} damage cover on eligible jobs.
          </p>
        </div>
      </section>
      <section className="container-page grid gap-5 py-20 sm:grid-cols-2">
        {points.map((p) => (
          <div key={p.title} className="flex gap-5 rounded-3xl border bg-card p-6 shadow-card">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Icon name={p.icon} className="size-6" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-foreground">{p.title}</h2>
              <p className="mt-1.5 text-muted-foreground">{p.text}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="container-page grid gap-10 pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground">Warranty questions</h2>
          <Button asChild variant="cta" size="lg" className="mt-6">
            <Link to="/services">Book a Service</Link>
          </Button>
        </div>
        <FaqList items={FAQS.slice(1, 5)} />
      </section>
    </>
  );
}
