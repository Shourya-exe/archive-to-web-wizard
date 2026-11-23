import { createFileRoute, Link } from "@tanstack/react-router";

import { FaqList } from "@/components/site/FaqList";
import { Icon } from "@/components/site/Icon";
import { Button } from "@/components/ui/button";
import { IMAGES, PILLARS, STEPS } from "@/lib/catalog";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Book in Under 60 Seconds | ServiceLane" },
      { name: "description", content: "Pick a service and slot, pay securely, share your Start Work OTP, and stay covered by our service warranty." },
      { property: "og:title", content: "How ServiceLane Works" },
      { property: "og:description", content: "Pick your service, pay securely, get your OTP — job done, backed by warranty." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

const STEP_IMAGES = [IMAGES.bathroom, IMAGES.hero, IMAGES.carpenter];

function HowItWorksPage() {
  return (
    <>
      <section className="bg-surface">
        <div className="container-page py-14 md:py-20">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-foreground md:text-[54px]">Book in Under 60 Seconds</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Fixed prices, a verified pro, and an OTP that keeps every visit accountable.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <article key={s.n} className="overflow-hidden rounded-3xl border bg-card shadow-card">
                <div className="relative aspect-[4/3]">
                  <img src={STEP_IMAGES[i]} alt="" loading="lazy" className="size-full object-cover" />
                  <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-2xl bg-accent text-lg font-extrabold text-accent-foreground">{s.n}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-extrabold text-foreground">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-20">
        <h2 className="text-3xl font-extrabold text-foreground md:text-[40px]">Built for Reliability, Not Guesswork</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-3xl border bg-card p-6 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon name={p.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="faq" className="container-page grid gap-10 pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground md:text-[40px]">Frequently Asked Questions</h2>
          <Button asChild variant="cta" size="lg" className="mt-6">
            <Link to="/services">Book a Service</Link>
          </Button>
        </div>
        <FaqList />
      </section>
    </>
  );
}
