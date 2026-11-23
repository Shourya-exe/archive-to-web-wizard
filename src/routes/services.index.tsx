import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";

import { CartPanel, MobileCartBar } from "@/components/site/CartPanel";
import { Icon } from "@/components/site/Icon";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ALL_SERVICES, BRAND, CATEGORIES, MOST_BOOKED_IDS, SERVICE_BY_ID } from "@/lib/catalog";

type Search = { q?: string };

export const Route = createFileRoute("/services/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const q = s["q"];
    return typeof q === "string" && q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "All Home Services & Prices — ServiceLane" },
      { name: "description", content: "AC repair, cleaning, pest control, electricians, plumbers, carpenters and painting with fixed prices across West Bengal." },
      { property: "og:title", content: "All Home Services & Prices — ServiceLane" },
      { property: "og:description", content: "Fixed-price home services across West Bengal. Pick a service, choose a slot, pay once." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const term = (q ?? "").toLowerCase();
  const results = term
    ? ALL_SERVICES.filter((s) => `${s.title} ${s.desc}`.toLowerCase().includes(term) ||
        CATEGORIES.some((c) => c.title.toLowerCase().includes(term) && c.groups.some((g) => g.services.includes(s))))
    : [];
  const popular = MOST_BOOKED_IDS.slice(0, 4).map((id) => SERVICE_BY_ID[id]).filter((x) => x !== undefined);

  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px] lg:py-14">
      <div>
        <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">Our Services</h1>
        <p className="mt-2 text-lg text-muted-foreground">Fixed prices. Pick a service, choose a slot, pay once.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const v = String(new FormData(e.currentTarget).get("q") ?? "").trim();
            navigate({ to: "/services", search: v ? { q: v } : {} });
          }}
          className="mt-6 flex h-12 max-w-xl items-center gap-2 rounded-2xl border bg-card px-4 shadow-card focus-within:ring-2 focus-within:ring-ring">
          <Search className="size-5 text-muted-foreground" aria-hidden="true" />
          <input
            name="q"
            defaultValue={q ?? ""}
            key={q ?? ""}
            aria-label="Search services"
            placeholder="Search AC repair, cleaning..."
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <Link to="/services" search={{}} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </Link>
          )}
        </form>

        {term && (
          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-foreground">
              {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
            </h2>
            {results.length === 0 ? (
              <p className="mt-3 text-muted-foreground">
                Nothing matched. Try “AC”, “cleaning” or “tap”, or{" "}
                <Link to="/custom-projects" className="font-semibold text-primary hover:underline">
                  send us photos for a quote
                </Link>
                .
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                {results.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            )}
          </section>
        )}

        <section className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/services/$category"
                params={{ category: c.slug }}
                className="group flex items-center gap-4 rounded-3xl border bg-card p-3 pr-5 shadow-card transition hover:border-primary hover:shadow-lift"
              >
                <div className="size-24 shrink-0 overflow-hidden rounded-2xl">
                  <img src={c.image} alt="" loading="lazy" className="zoom-on-hover size-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-primary">
                    <Icon name={c.icon} className="size-4" />
                    <h2 className="text-base font-extrabold text-foreground">{c.shortTitle}</h2>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.tags.join(" · ")}</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
            <Link
              to="/custom-projects"
              className="group flex items-center gap-4 rounded-3xl bg-accent p-3 pr-5 text-accent-foreground shadow-card transition hover:shadow-lift"
            >
              <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-accent-foreground/10">
                <Icon name="upload" className="size-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-extrabold">Large & Custom Projects</h2>
                <p className="mt-1 text-sm">Upload photos or a short video and get a quote.</p>
              </div>
              <ArrowRight className="size-5 shrink-0 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold text-foreground">Most booked</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
            {popular.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <p className="mt-10 flex items-center gap-2 rounded-2xl bg-primary-soft px-4 py-3 text-sm text-primary">
            <Icon name="shield" className="size-4 shrink-0" />
            <span>
              <strong>Verified pros, fixed prices.</strong> {BRAND.warrantyDays}-day service warranty on eligible jobs.
            </span>
          </p>
        </section>
      </div>
      <div className="hidden lg:block">
        <CartPanel className="sticky top-24" />
      </div>
      <MobileCartBar />
    </div>
  );
}
