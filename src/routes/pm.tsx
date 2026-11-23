import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Lock, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { BRAND } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pm")({
  head: () => ({
    meta: [
      { title: "Project Manager Dashboard — ServiceLane" },
      { name: "description", content: "Today's orders and custom project leads for ServiceLane Project Managers." },
      { property: "og:title", content: "Project Manager Dashboard — ServiceLane" },
      { property: "og:description", content: "Verify Start Work OTPs, track jobs and follow up on custom leads." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PmDashboard,
});

type Job = {
  id: string;
  slot: string;
  client: string;
  address: string;
  services: string;
  otp: string;
  status: "confirmed" | "in_progress" | "completed";
  startedAt?: string;
  phone: string;
};

const DEMO_JOBS: Job[] = [
  { id: "demo-1", slot: "9 – 11 AM", client: "Ananya Roy", address: "Action Area I, New Town, Kolkata", services: "AC Foam-Jet Service", otp: "4821", status: "in_progress", startedAt: "9:05 AM", phone: "9830000001" },
  { id: "demo-2", slot: "11 AM – 1 PM", client: "Debashis Sen", address: "BD Block, Salt Lake, Kolkata", services: "Bathroom Deep Cleaning, Sofa Shampooing", otp: "7394", status: "confirmed", phone: "9830000002" },
];

function PmDashboard() {
  const { lastOrder, hydrated } = useCart();
  const [tab, setTab] = useState<"orders" | "leads">("orders");
  const [jobs, setJobs] = useState<Job[]>(DEMO_JOBS);

  useEffect(() => {
    if (!hydrated || !lastOrder) return;
    setJobs((prev) =>
      prev.some((j) => j.id === lastOrder.code)
        ? prev
        : [
            {
              id: lastOrder.code,
              slot: lastOrder.slot,
              client: lastOrder.name,
              address: `${lastOrder.address}, ${lastOrder.area}`,
              services: lastOrder.items.map((i) => i.title).join(", "),
              otp: lastOrder.otp,
              status: "confirmed",
              phone: lastOrder.phone,
            },
            ...prev,
          ],
    );
  }, [hydrated, lastOrder]);

  const update = (id: string, patch: Partial<Job>) => setJobs((js) => js.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  const today = new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-md px-5 py-8">
        <div className="flex items-start justify-between">
          <div>
            <Link to="/" className="text-xs font-extrabold text-primary">{BRAND.name}</Link>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">Project Manager</p>
            <h1 className="text-4xl font-extrabold text-foreground">{today}</h1>
          </div>
          <button type="button" onClick={() => toast("Dashboard locked")} className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-primary">
            <Lock className="size-4" /> Lock
          </button>
        </div>

        <div role="tablist" className="mt-6 grid grid-cols-2 rounded-2xl bg-border/70 p-1">
          {(
            [
              ["orders", `Orders · ${jobs.length}`],
              ["leads", "Custom leads · 1"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={cn("rounded-xl py-2.5 text-sm font-bold transition", tab === k ? "bg-card text-primary shadow-card" : "text-muted-foreground")}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "orders" ? (
          <div className="mt-5 space-y-4">
            {jobs.map((j) => (
              <JobCard key={j.id} job={j} onUpdate={(p) => update(j.id, p)} />
            ))}
          </div>
        ) : (
          <LeadCard />
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Job["status"] }) {
  const map = {
    confirmed: ["Confirmed", "bg-primary-soft text-primary"],
    in_progress: ["In progress", "bg-accent-soft text-accent-ink"],
    completed: ["Completed", "bg-success text-primary-foreground"],
  } as const;
  const [label, cls] = map[status];
  return <span className={cn("rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide", cls)}>{label}</span>;
}

function JobCard({ job, onUpdate }: { job: Job; onUpdate: (p: Partial<Job>) => void }) {
  const [code, setCode] = useState("");
  const [bad, setBad] = useState(false);

  const verify = (v: string) => {
    setCode(v);
    setBad(false);
    if (v.length === 4) {
      if (v === job.otp) {
        onUpdate({ status: "in_progress", startedAt: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }) });
        toast.success("OTP verified — work started");
      } else {
        setBad(true);
      }
    }
  };

  return (
    <article className="rounded-3xl border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-extrabold text-foreground">{job.slot}</p>
        <StatusPill status={job.status} />
      </div>
      <p className="mt-3 text-lg font-bold text-foreground">{job.client}</p>
      <p className="text-sm text-muted-foreground">
        {job.address}
        {job.startedAt && job.status !== "confirmed" && ` · Started ${job.startedAt}`}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{job.services}</p>

      {job.status === "confirmed" && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button asChild variant="soft" size="lg">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`} target="_blank" rel="noreferrer">
                <MapPin /> Maps
              </a>
            </Button>
            <Button asChild variant="soft" size="lg">
              <a href={`tel:+91${job.phone}`}>
                <Phone /> Call client
              </a>
            </Button>
          </div>
          <div className="mt-5 border-t pt-5">
            <p className="font-bold text-foreground">Enter the client's Start OTP</p>
            <InputOTP maxLength={4} value={code} onChange={verify} containerClassName="mt-3">
              <InputOTPGroup className="gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot key={i} index={i} className={cn("h-14 w-14 rounded-xl border-2 text-2xl font-extrabold first:rounded-xl last:rounded-xl", bad && "border-destructive")} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {bad && <p className="mt-2 text-sm font-semibold text-destructive">That OTP doesn't match. Ask the client to check their booking.</p>}
          </div>
        </>
      )}

      {job.status === "in_progress" && (
        <div className="mt-4 space-y-3">
          <Button variant="cta" size="xl" className="w-full" onClick={() => { onUpdate({ status: "completed" }); toast.success("Job marked completed"); }}>
            Mark Completed
          </Button>
          <label className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed text-sm font-semibold text-muted-foreground hover:border-primary">
            <Camera className="size-4" /> Add QA photos (optional)
            <input type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files?.length && toast.success(`${e.target.files.length} QA photo(s) added`)} />
          </label>
        </div>
      )}
    </article>
  );
}

function LeadCard() {
  return (
    <div className="mt-5">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Custom project leads</h2>
      <article className="mt-3 rounded-3xl border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-xl font-extrabold text-foreground">Waterproofing</p>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">NEW</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Rupa Banerjee · Howrah</p>
        <p className="mt-3 rounded-2xl bg-surface p-3 text-sm italic text-ink-soft">
          “Damp patches on the bedroom ceiling after every monsoon. Top-floor flat, terrace above. Would like it fixed before Durga Puja.”
        </p>
        <p className="mt-3 text-sm font-bold text-primary">3 photos · 1 video</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button asChild variant="soft" size="lg">
            <a href="tel:+919830000003"><Phone /> Call</a>
          </Button>
          <Button asChild variant="soft" size="lg">
            <a href="https://wa.me/919830000003" target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
          </Button>
        </div>
      </article>
    </div>
  );
}
