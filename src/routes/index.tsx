import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MapPin, Search, Star } from "lucide-react";
import { useState, type FormEvent } from "react";

import { FaqList } from "@/components/site/FaqList";
import { Icon } from "@/components/site/Icon";
import { ScrollRow } from "@/components/site/ScrollRow";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Button } from "@/components/ui/button";
import {
  BRAND,
  CATEGORIES,
  HERO_CHIPS,
  HERO_TRUST,
  IMAGES,
  MOST_BOOKED_IDS,
  PILLARS,
  SERVICE_BY_ID,
  STEPS,
} from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ServiceLane — Home Repairs, Cleaning & Daily Help in West Bengal" },
      {
        name: "description",
        content:
          "Book background-verified technicians across West Bengal with upfront rate cards, on-time slots and a service warranty.",
      },
      { property: "og:title", content: "ServiceLane — Home Repairs, Cleaning & Daily Help" },
      {
        property: "og:description",
        content: "Verified pros, fixed prices and a service warranty for every home job across West Bengal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <Spotlight />
      <MostBooked />
      <AllServices />
      <HowItWorks />
      <Reliability />
      <FeatureSplit />
      <Reviews />
      <Faq />
      <ClosingCta />
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/services", search: q.trim() ? { q: q.trim() } : {} });
  };
  return (
    <section className="bg-surface">
      <div className="container-page grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent-ink">
            <MapPin className="size-3.5" aria-hidden="true" /> Now serving West Bengal
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-[58px]">
            Home Repairs, Cleaning &amp; Daily Help — <span className="text-primary-strong">Handled Right the First Time.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Book background-verified technicians and home-care specialists across West Bengal with upfront rate cards,
            on-time slots, and a {BRAND.warrantyDays}-day service warranty.
          </p>
          <form onSubmit={submit} className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl border bg-card p-2 shadow-card">
            <Search className="ml-2 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="What needs fixing or cleaning today?"
              placeholder="What needs fixing or cleaning today?"
              className="min-w-0 flex-1 bg-transparent py-2 text-[15px] outline-none placeholder:text-muted-foreground"
            />
            <Button type="submit" variant="cta" size="lg" className="shrink-0 px-4 sm:px-6">
              Find a Pro
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {HERO_CHIPS.map((c) => (
              <Link
                key={c.label}
                to="/services/$category"
                params={{ category: c.slug }}
                className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-primary hover:text-primary"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
            <div className="col-span-3 row-span-2 overflow-hidden rounded-3xl">
              <img src={IMAGES.hero} alt="A ServiceLane technician arriving at a Kolkata home" className="size-full object-cover" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-3xl">
              <img src={IMAGES.kitchen} alt="Kitchen deep cleaning in progress" className="aspect-square size-full object-cover" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-3xl">
              <img src={IMAGES.ac} alt="AC foam-jet servicing" className="aspect-square size-full object-cover" />
            </div>
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-lift sm:left-6">
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon name="shield" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">{BRAND.warrantyDays}-day service warranty</p>
              <p className="text-xs text-muted-foreground">+ {BRAND.coverageAmount} damage cover</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pb-12">
        <div className="grid gap-4 rounded-3xl border bg-card p-5 shadow-card sm:grid-cols-3 sm:p-6">
          {HERO_TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon name={t.icon} className="size-5" />
              </span>
              <div>
                <p className="font-bold text-foreground">{t.title}</p>
                <p className="text-sm text-muted-foreground">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  return (
    <section className="container-page py-14">
      <SectionHeading title="What are you looking for?" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} to="/services/$category" params={{ category: c.slug }} className="group text-center">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <img src={c.image} alt="" loading="lazy" className="zoom-on-hover size-full object-cover" />
              <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-lg bg-card/95 text-primary shadow-card">
                <Icon name={c.icon} className="size-4" />
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold leading-tight text-foreground group-hover:text-primary">{c.shortTitle}</p>
            {c.slug === "painting-wall-upgrades" && <p className="text-xs font-semibold text-accent-ink">Free site survey</p>}
          </Link>
        ))}
        <Link to="/custom-projects" className="group text-center">
          <div className="grid aspect-square place-items-center rounded-2xl bg-accent text-accent-foreground transition group-hover:brightness-95">
            <div className="flex flex-col items-center gap-2 p-3">
              <Icon name="upload" className="size-7" />
              <span className="text-xs font-bold">Upload photos, get a quote</span>
            </div>
          </div>
          <p className="mt-2.5 text-sm font-semibold leading-tight text-foreground group-hover:text-primary">Large & Custom Projects</p>
        </Link>
      </div>
    </section>
  );
}

function Spotlight() {
  const slides = [
    {
      eyebrow: "Popular",
      title: "Hire a verified electrician",
      sub: "Wiring, repairs, fans and lights.",
      image: IMAGES.electrician,
      cta: "Book Now",
      to: "/services/$category" as const,
      params: { category: "electrician" },
    },
    {
      eyebrow: "Bathroom & kitchen",
      title: "Spotless bathrooms, zero scrubbing",
      sub: "Hard-water stains, tiles and fixtures, deep-cleaned.",
      image: IMAGES.bathroom,
      cta: "Book Now",
      to: "/services/$category" as const,
      params: { category: "cleaning-pest-control" },
    },
    {
      eyebrow: "Large & custom projects",
      title: "Big job? Show us, and get a quote.",
      sub: "Share photos or a short video of the space.",
      image: IMAGES.waterproof,
      cta: "Request a Quote",
      to: "/custom-projects" as const,
      params: {},
    },
    {
      eyebrow: "AC & appliances",
      title: "Cooler rooms with a foam-jet service",
      sub: "Deep coil cleaning for Split & Window ACs.",
      image: IMAGES.ac,
      cta: "Book Now",
      to: "/services/$category" as const,
      params: { category: "ac-appliance-repair" },
    },
  ];
  return (
    <section className="container-page pb-16">
      <SectionHeading title="In the spotlight" />
      <ScrollRow itemClassName="w-[86%] sm:w-[460px]">
        {slides.map((sl) => (
          <div key={sl.title} className="group relative h-[260px] overflow-hidden rounded-3xl bg-primary">
            <img src={sl.image} alt="" loading="lazy" className="zoom-on-hover absolute inset-0 size-full object-cover" />
            <div className="photo-fade absolute inset-0" />
            <div className="relative flex h-full max-w-[62%] flex-col justify-between p-6">
              <div>
                <p className="text-xs font-semibold text-on-dark-muted">{sl.eyebrow}</p>
                <h3 className="mt-1.5 text-2xl font-extrabold leading-tight text-on-dark">{sl.title}</h3>
                <p className="mt-2 text-sm text-on-dark-muted">{sl.sub}</p>
              </div>
              <Button asChild variant="cta" className="w-fit">
                {sl.to === "/custom-projects" ? (
                  <Link to="/custom-projects">{sl.cta}</Link>
                ) : (
                  <Link to="/services/$category" params={sl.params as { category: string }}>
                    {sl.cta}
                  </Link>
                )}
              </Button>
            </div>
          </div>
        ))}
      </ScrollRow>
    </section>
  );
}

function MostBooked() {
  const items = MOST_BOOKED_IDS.map((id) => SERVICE_BY_ID[id]).filter((x) => x !== undefined);
  return (
    <section className="container-page pb-20">
      <SectionHeading
        title="Most-Booked Home Services"
        sub="Transparent starting prices with zero hidden visit surprises."
        action={
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
            View all services <ArrowRight className="size-4" />
          </Link>
        }
      />
      <ScrollRow itemClassName="w-[200px] sm:w-[232px]">
        {items.map((sv) => (
          <ServiceCard key={sv.id} service={sv} />
        ))}
      </ScrollRow>
    </section>
  );
}

function AllServices() {
  return (
    <section className="bg-surface py-20">
      <div className="container-page">
        <SectionHeading
          title="Complete Home Services Under One Roof"
          sub="Every repair, deep clean, installation, and renovation — organized with transparent pricing and dedicated specialists."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/services/$category"
              params={{ category: c.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.image} alt={c.title} loading="lazy" className="zoom-on-hover size-full object-cover" />
                </div>
                <span className="absolute -bottom-5 left-5 grid size-11 place-items-center rounded-xl border-4 border-card bg-primary-soft text-primary">
                  <Icon name={c.icon} className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 pt-8">
                <h3 className="text-lg font-extrabold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground/90">{c.tags.join(" · ")}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-primary">
                  {c.cta} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
          <Link
            to="/custom-projects"
            className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-accent p-6 text-accent-foreground shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="mb-auto grid size-11 place-items-center rounded-xl bg-accent-foreground/10">
              <Icon name="upload" className="size-5" />
            </span>
            <h3 className="mt-10 text-lg font-extrabold">Large & Custom Projects</h3>
            <p className="mt-2 text-sm leading-relaxed">
              Large building cleaning, full renovation, waterproofing. Upload photos or a short video and get a quote.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
              Request a Quote <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-primary py-20 text-on-dark">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative hidden overflow-hidden rounded-3xl lg:block">
          <img src={IMAGES.homeHelp} alt="A verified helper at work" loading="lazy" className="h-[460px] w-full object-cover" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-card/95 p-4 text-foreground shadow-lift">
            <BadgeCheck className="size-6 text-success" aria-hidden="true" />
            <p className="text-sm font-semibold">Start Work OTP keeps every visit verified.</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold md:text-[40px]">Book in Under 60 Seconds</h2>
          <ol className="mt-10 space-y-8">
            {STEPS.map((st) => (
              <li key={st.n} className="flex gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-lg font-extrabold text-accent-foreground">
                  {st.n}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{st.title}</h3>
                  <p className="mt-1.5 text-on-dark-muted">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button asChild variant="cta" size="lg" className="mt-10">
            <Link to="/services">Book a Service</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Reliability() {
  return (
    <section className="container-page py-20">
      <SectionHeading title="Built for Reliability, Not Guesswork" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p) => (
          <div key={p.title} className="rounded-3xl border bg-card p-6 shadow-card">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Icon name={p.icon} className="size-6" />
            </span>
            <h3 className="mt-5 text-lg font-extrabold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureSplit() {
  return (
    <section className="container-page grid gap-5 pb-20 lg:grid-cols-2">
      <FeatureCard
        eyebrow="Daily help"
        title="Everyday Chores, Covered On Demand"
        text="Skip the stress of unreliable daily help. Book verified professionals for sweeping, mopping, dishwashing, and laundry on single visits or pre-paid multi-visit value packs."
        image={IMAGES.homeHelp}
        cta={
          <Link to="/services/$category" params={{ category: "instant-home-help" }}>
            Explore Home Help Packs
          </Link>
        }
      />
      <FeatureCard
        eyebrow="Wall upgrades"
        title="Upgrade Your Walls Without the Contractor Chaos"
        text="From single accent walls and damp-proofing to full-home painting and decorative wall panels, get a clear on-site estimate, branded materials, and supervised on-time handover."
        image={IMAGES.painting}
        cta={<Link to="/custom-projects">Schedule Site Survey</Link>}
      />
    </section>
  );
}

function FeatureCard({ eyebrow, title, text, image, cta }: { eyebrow: string; title: string; text: string; image: string; cta: React.ReactNode }) {
  return (
    <div className="group relative min-h-[440px] overflow-hidden rounded-3xl bg-primary">
      <img src={image} alt="" loading="lazy" className="zoom-on-hover absolute inset-0 size-full object-cover" />
      <div className="photo-fade-up absolute inset-0" />
      <div className="relative flex h-full min-h-[440px] flex-col justify-end p-7 md:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        <h3 className="mt-2 max-w-md text-2xl font-extrabold leading-tight text-on-dark md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-on-dark-muted md:text-[15px]">{text}</p>
        <Button asChild variant="cta" size="lg" className="mt-6 w-fit">
          {cta}
        </Button>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <section className="bg-surface py-20">
      <div className="container-page">
        <SectionHeading
          title="Trusted by Households Across West Bengal"
          sub="Genuine, verified customer reviews will appear here after launch."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-3xl border border-dashed border-input bg-card p-6">
              <div className="flex gap-1 text-accent" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="size-4 fill-current opacity-30" />
                ))}
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded-full bg-muted" />
                <div className="h-3 w-11/12 rounded-full bg-muted" />
                <div className="h-3 w-2/3 rounded-full bg-muted" />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Verified review coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="container-page grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <h2 className="text-3xl font-extrabold text-foreground md:text-[40px]">Frequently Asked Questions</h2>
        <p className="mt-3 text-muted-foreground">
          Still unsure? Call us on{" "}
          <a href={BRAND.supportPhoneHref} className="font-semibold text-primary hover:underline">
            {BRAND.supportPhone}
          </a>
          .
        </p>
      </div>
      <FaqList />
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="container-page grid gap-5 pb-24 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12">
        <img src={IMAGES.hero} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-35" />
        <div className="photo-fade absolute inset-0" />
        <div className="relative max-w-md">
          <h2 className="text-3xl font-extrabold leading-tight text-on-dark md:text-4xl">Ready to Cross Home Repairs Off Your List?</h2>
          <p className="mt-3 text-on-dark-muted">Pick a service, choose your slot, and let a verified pro handle the rest.</p>
          <Button asChild variant="cta" size="xl" className="mt-7">
            <Link to="/services">Book Your First Service</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-3xl bg-accent-soft p-8 md:p-10">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <Icon name="userCheck" className="size-6" />
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-foreground">Skilled Technician or Home-Care Professional?</h2>
          <p className="mt-2 text-muted-foreground">
            Partner with {BRAND.name} for steady local bookings, transparent payouts, and flexible schedules.
          </p>
        </div>
        <Button asChild size="lg" className="mt-7 w-fit">
          <Link to="/join-as-pro">Register as a Service Partner</Link>
        </Button>
      </div>
    </section>
  );
}
