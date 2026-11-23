import { createFileRoute } from "@tanstack/react-router";
import { FileVideo, Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Icon } from "@/components/site/Icon";
import { Button } from "@/components/ui/button";
import { AREAS, BIG_JOBS, PROJECT_TYPES } from "@/lib/catalog";
import { isValidMobile } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/custom-projects")({
  head: () => ({
    meta: [
      { title: "Large & Custom Projects — Get a Quote | ServiceLane" },
      {
        name: "description",
        content: "Large building cleaning, renovation, waterproofing and painting. Share photos or a video and get a quote from our Project Manager.",
      },
      { property: "og:title", content: "Big job? Show us, and get a quote — ServiceLane" },
      { property: "og:description", content: "Share photos or a short video and our Project Manager will call you with a quote." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomProjects,
});

const STEPS = [
  { n: "1", title: "Share the details", text: "Fill in the form and add photos or a short video of the space." },
  { n: "2", title: "Our Project Manager reviews", text: "He checks your photos and notes, and may visit the site for a survey." },
  { n: "3", title: "Get a clear quote", text: "You receive a call or WhatsApp message with the quote and timeline." },
];

const MB = 1024 * 1024;
const MAX_PHOTOS = 5;
const MAX_VIDEOS = 2;

const inputCls =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40";

function CustomProjects() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", area: AREAS[0] ?? "Kolkata", type: PROJECT_TYPES[0] ?? "", notes: "" });
  const [error, setError] = useState<string | null>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    const problems: string[] = [];
    for (const f of Array.from(list)) {
      const isVideo = f.type.startsWith("video/");
      const isImage = f.type.startsWith("image/");
      if (!isVideo && !isImage) {
        problems.push(`${f.name} isn't a photo or video`);
        continue;
      }
      if (isImage && f.size > 10 * MB) problems.push(`${f.name} is over 10 MB`);
      else if (isVideo && f.size > 100 * MB) problems.push(`${f.name} is over 100 MB`);
      else if (isImage && next.filter((x) => x.type.startsWith("image/")).length >= MAX_PHOTOS) problems.push(`Up to ${MAX_PHOTOS} photos`);
      else if (isVideo && next.filter((x) => x.type.startsWith("video/")).length >= MAX_VIDEOS) problems.push(`Up to ${MAX_VIDEOS} videos`);
      else next.push(f);
    }
    setFiles(next);
    if (problems.length) toast.error(problems.join(" · "));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!isValidMobile(form.phone)) return setError("Enter a valid 10-digit mobile number.");
    setError(null);
    toast.success("Request sent! Our Project Manager will call or WhatsApp you shortly.");
    setForm((f) => ({ ...f, name: "", phone: "", notes: "" }));
    setFiles([]);
  };

  return (
    <>
      <section className="bg-primary">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div className="text-on-dark">
            <span className="rounded-full bg-on-dark/10 px-3 py-1.5 text-xs font-bold text-accent">Large & Custom Projects</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-[54px]">Big job? Show us, and get a quote.</h1>
            <p className="mt-5 max-w-lg text-lg text-on-dark-muted">
              For large building cleaning, full renovation, waterproofing, painting and appliance repairs that need a site look. Share photos or a
              short video and our Project Manager will call you with a quote.
            </p>
            <ol className="mt-9 space-y-6">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent font-extrabold text-accent-foreground">{s.n}</span>
                  <div>
                    <p className="font-bold">{s.title}</p>
                    <p className="text-sm text-on-dark-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <form onSubmit={submit} noValidate className="rounded-3xl bg-card p-6 shadow-lift md:p-8">
            <h2 className="text-2xl font-extrabold text-foreground">Tell us about your project</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Full name</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Mobile number</span>
                <div className="flex">
                  <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-input bg-muted px-3 font-semibold text-ink-soft">+91</span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    inputMode="numeric"
                    placeholder="10-digit number"
                    className={cn(inputCls, "rounded-l-none")}
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Area in West Bengal</span>
                <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={cn(inputCls, "cursor-pointer")}>
                  {AREAS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Project type</span>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={cn(inputCls, "cursor-pointer")}>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-bold">Project notes</span>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={4}
                placeholder="What needs to be done, how big is the space, any deadline?"
                className={cn(inputCls, "h-auto py-3")}
              />
            </label>

            <p className="mb-1.5 mt-4 text-sm font-bold">Photos & videos</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-input bg-surface px-4 py-7 text-center transition hover:border-primary"
            >
              <Upload className="size-6 text-primary" />
              <span className="mt-2 font-bold text-primary">Tap to add photos or videos</span>
              <span className="mt-1 text-xs text-muted-foreground">Up to 5 photos (10 MB each) and 1–2 short videos (up to 100 MB)</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*,video/*" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            {files.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {files.map((f, i) => {
                  const video = f.type.startsWith("video/");
                  return (
                    <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-2xl border bg-card p-2 pr-2.5">
                      <span className={cn("grid size-10 place-items-center rounded-xl", video ? "bg-accent-soft text-accent-ink" : "bg-primary-soft text-primary")}>
                        {video ? <FileVideo className="size-5" /> : <ImageIcon className="size-5" />}
                      </span>
                      <span className="max-w-[160px]">
                        <span className="block truncate text-sm font-semibold">{f.name}</span>
                        <span className="block text-xs text-muted-foreground">{(f.size / MB).toFixed(1)} MB</span>
                      </span>
                      <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))} className="grid size-7 place-items-center rounded-full hover:bg-muted">
                        <X className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}
            <Button type="submit" variant="cta" size="xl" className="mt-6 w-full">
              Send for a Quote
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Your request goes straight to our Project Manager, who will call or WhatsApp you.</p>
          </form>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-3xl font-extrabold text-foreground md:text-[40px]">What we take on</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BIG_JOBS.map((j) => (
            <article key={j.title} className="group overflow-hidden rounded-3xl border bg-card shadow-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={j.image} alt={j.title} loading="lazy" className="zoom-on-hover size-full object-cover" />
              </div>
              <div className="p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon name={j.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-foreground">{j.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{j.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
