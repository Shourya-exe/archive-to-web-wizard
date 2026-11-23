import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import { AddButton } from "@/components/site/AddButton";
import { CartPanel, MobileCartBar } from "@/components/site/CartPanel";
import { Icon } from "@/components/site/Icon";
import { BRAND, CATEGORIES, formatPrice, getCategory } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/$category")({
  loader: ({ params }) => {
    const c = getCategory(params.category);
    if (!c) throw notFound();
    return { title: c.title, copy: c.copy };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Fixed Prices | ServiceLane` },
          { name: "description", content: loaderData.copy },
          { property: "og:title", content: `${loaderData.title} — ServiceLane` },
          { property: "og:description", content: loaderData.copy },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Service unavailable — ServiceLane" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-extrabold">We couldn't find that service</h1>
      <Link to="/services" className="mt-4 inline-block font-semibold text-primary hover:underline">
        See all services
      </Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const c = getCategory(category);
  if (!c) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        <img src={c.image} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="photo-fade absolute inset-0" />
        <div className="container-page relative py-14 md:py-20">
          <span className="grid size-12 place-items-center rounded-2xl bg-on-dark/15 text-accent backdrop-blur">
            <Icon name={c.icon} className="size-6" />
          </span>
          <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight text-on-dark md:text-5xl">{c.title}</h1>
          <p className="mt-3 max-w-lg text-lg text-on-dark-muted">Fixed prices. Pick a service, choose a slot, pay once.</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-on-dark/10 px-3 py-1.5 text-xs font-semibold text-on-dark backdrop-blur">
            <Icon name="shield" className="size-3.5 text-accent" /> {BRAND.warrantyDays}-day warranty · Verified pros
          </p>
        </div>
      </section>

      <div className="sticky top-[72px] z-30 border-b bg-background/95 backdrop-blur">
        <div className="container-page no-scrollbar flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/services/$category"
              params={{ category: cat.slug }}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 text-sm font-semibold transition",
                cat.slug === c.slug ? "border-primary bg-primary text-primary-foreground" : "bg-card text-ink-soft hover:border-primary",
              )}
            >
              <img src={cat.image} alt="" className="size-7 rounded-full object-cover" />
              {cat.shortTitle}
            </Link>
          ))}
        </div>
      </div>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          {c.groups.map((g) => (
            <section key={g.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{g.title}</h2>
              <ul className="mt-3 divide-y">
                {g.services.map((sv) => (
                  <li key={sv.id} className="flex gap-4 py-5">
                    <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-muted sm:size-24">
                      <img src={sv.image} alt="" loading="lazy" className="size-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-foreground sm:text-lg">{sv.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{sv.desc}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Clock className="size-3.5" aria-hidden="true" /> {sv.duration}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end justify-between gap-3">
                      <p className="text-right text-lg font-extrabold text-foreground">
                        {sv.price > 0 && sv.priceLead === "Visit from" && <span className="block text-[11px] font-medium text-muted-foreground">Visit from</span>}
                        {formatPrice(sv.price)}
                      </p>
                      <AddButton id={sv.id} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-foreground">Need something bigger or not listed?</p>
              <p className="text-sm text-muted-foreground">Share photos or a short video and our Project Manager will call you with a quote.</p>
            </div>
            <Link to="/custom-projects" className="shrink-0 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground hover:brightness-95">
              Request a Quote
            </Link>
          </div>
        </div>
        <div className="hidden lg:block">
          <CartPanel className="sticky top-40" />
        </div>
        <div className="lg:hidden">
          <CartPanel />
        </div>
      </div>
      <MobileCartBar />
    </>
  );
}
