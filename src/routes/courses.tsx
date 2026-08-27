import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Clock,
  Cpu,
  Layers,
  LayoutGrid,
  MoreHorizontal,
  Terminal,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CourseArt, type ArtKind } from "@/components/CourseArt";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Free CS Courses — Python, ML & Deep Learning | Taleem" },
      {
        name: "description",
        content:
          "A curated list of free computer science courses with certificates: Python, machine learning, deep learning, pandas, time series, feature engineering and computer vision.",
      },
      { property: "og:title", content: "Free Computer Science Courses — Taleem" },
      {
        property: "og:description",
        content: "Nine free, certificate-backed CS courses to level up your programming and data skills.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://taleem-study-buddy.lovable.app/courses" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://taleem-study-buddy.lovable.app/courses" }],
  }),
  component: Courses,
});

type Category = "python" | "ml" | "other";

type Course = {
  n: number;
  title: string;
  provider: string;
  url: string;
  art: ArtKind;
  category: Category;
  level: "Beginner" | "Intermediate";
  hours: string;
  cert: boolean;
  tags: string[];
  blurb: string;
};

const CATEGORIES: {
  id: Category | "all";
  label: string;
  blurb: string;
  icon: typeof LayoutGrid;
}[] = [
  { id: "all", label: "All Courses", blurb: "The full catalogue in one grid.", icon: LayoutGrid },
  { id: "python", label: "Python & Programming", blurb: "Write your first lines and master the language.", icon: Terminal },
  { id: "ml", label: "Machine Learning & AI", blurb: "Models, neural nets and intelligent systems.", icon: Cpu },
  { id: "other", label: "More — Coming Soon", blurb: "New tracks and future courses land here.", icon: MoreHorizontal },
];

const COURSES: Course[] = [
  {
    n: 1,
    title: "Intro to Programming",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/intro-to-programming",
    art: "code",
    category: "python",
    level: "Beginner",
    hours: "~5 hrs",
    cert: true,
    tags: ["Python", "Variables", "Loops"],
    blurb:
      "The absolute starting line. Variables, functions, conditionals and loops in Python — no prior coding needed.",
  },
  {
    n: 2,
    title: "Python",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/python",
    art: "python",
    category: "python",
    level: "Beginner",
    hours: "~5 hrs",
    cert: true,
    tags: ["Lists", "Strings", "Libraries"],
    blurb:
      "The language every data and AI job asks for. Lists, dictionaries, string handling and working with external libraries.",
  },
  {
    n: 3,
    title: "Intro to Machine Learning",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/intro-to-machine-learning",
    art: "ml",
    category: "ml",
    level: "Beginner",
    hours: "~3 hrs",
    cert: true,
    tags: ["Models", "Validation", "Trees"],
    blurb:
      "Build your first real model, learn how to validate it and understand underfitting vs overfitting.",
  },
  {
    n: 4,
    title: "Intro to Deep Learning",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/intro-to-deep-learning",
    art: "deep",
    category: "ml",
    level: "Intermediate",
    hours: "~4 hrs",
    cert: true,
    tags: ["Neural nets", "Keras", "Dropout"],
    blurb:
      "Neural networks from neurons up — layers, activation functions, training loops and overfitting control.",
  },
  {
    n: 5,
    title: "Intermediate Machine Learning",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/intermediate-machine-learning",
    art: "boost",
    category: "ml",
    level: "Intermediate",
    hours: "~4 hrs",
    cert: true,
    tags: ["XGBoost", "Pipelines", "Leakage"],
    blurb:
      "Handle missing values and categorical data, build pipelines, cross-validate and push accuracy with gradient boosting.",
  },
  {
    n: 6,
    title: "Pandas",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/pandas",
    art: "table",
    category: "ml",
    level: "Beginner",
    hours: "~4 hrs",
    cert: true,
    tags: ["DataFrames", "GroupBy", "Joins"],
    blurb:
      "The data-wrangling toolkit. Select, filter, group, summarise and merge real datasets with confidence.",
  },
  {
    n: 7,
    title: "Time Series",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/time-series",
    art: "timeseries",
    category: "ml",
    level: "Intermediate",
    hours: "~5 hrs",
    cert: true,
    tags: ["Trends", "Seasonality", "Forecasting"],
    blurb:
      "Forecast what happens next — trend, seasonality, lag features and hybrid forecasting models.",
  },
  {
    n: 8,
    title: "Feature Engineering",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/feature-engineering",
    art: "gears",
    category: "ml",
    level: "Intermediate",
    hours: "~5 hrs",
    cert: true,
    tags: ["Encoding", "Clustering", "PCA"],
    blurb:
      "Better features beat bigger models. Mutual information, target encoding, clustering and PCA.",
  },
  {
    n: 9,
    title: "Computer Vision",
    provider: "Kaggle",
    url: "https://www.kaggle.com/learn/computer-vision",
    art: "vision",
    category: "ml",
    level: "Intermediate",
    hours: "~4 hrs",
    cert: true,
    tags: ["CNNs", "Convolution", "Augmentation"],
    blurb:
      "Teach a machine to see — convolutional networks, feature extraction and data augmentation.",
  },
];

const TYPED = "> taleem --list free-cs-courses";

function Courses() {
  const [typed, setTyped] = useState("");
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? COURSES : COURSES.filter((c) => c.category === active);
  const countFor = (id: Category | "all") =>
    id === "all" ? COURSES.length : COURSES.filter((c) => c.category === id).length;

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TYPED.slice(0, i));
      if (i >= TYPED.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-8 sm:px-8 sm:py-12">
        <SiteHeader />

        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="pointer-events-none absolute inset-0 text-primary/15 opacity-60 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              9 free courses · certificates included
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Level up your
              <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                computer science skills — for free.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A hand-picked path from your first line of Python to training convolutional neural
              networks. Every course below is free, self-paced and hands-on in the browser.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.04] px-4 py-3 font-mono text-xs text-primary sm:text-sm">
              <Terminal className="h-4 w-4 shrink-0" />
              <span>{typed}</span>
              <span className="inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Layers className="h-3.5 w-3.5 text-primary" />
            browse-by-category
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const count = countFor(cat.id);
              const selected = active === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  aria-pressed={selected}
                  className={`group animate-fade-up relative overflow-hidden rounded-2xl border p-4 text-left shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1.5 ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/60"
                  }`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-[image:var(--gradient-primary)] transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                        selected
                          ? "border-primary/50 bg-primary/15 text-primary"
                          : "border-border bg-muted/50 text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {count} {count === 1 ? "course" : "courses"}
                    </span>
                  </div>
                  <div className="mt-3 text-sm font-semibold tracking-tight">{cat.label}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cat.blurb}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    {selected ? "Showing below" : "View courses"}
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {active !== "all" && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs">
            <span className="font-mono text-primary">
              filter: {CATEGORIES.find((c) => c.id === active)?.label} — {filtered.length}{" "}
              {filtered.length === 1 ? "course" : "courses"}
            </span>
            <button
              type="button"
              onClick={() => setActive("all")}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <li
              key={c.n}
              className="group animate-fade-up relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1.5 hover:border-primary/60"
              style={{ animationDelay: `${c.n * 60}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-[image:var(--gradient-primary)] transition-transform duration-300 group-hover:scale-x-100" />

              <div className="transition duration-500 group-hover:scale-[1.03]">
                <CourseArt kind={c.art} />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs text-primary">
                    {String(c.n).padStart(2, "0")} · {c.provider}
                  </div>
                  <h2 className="mt-1 text-base font-semibold tracking-tight">{c.title}</h2>
                </div>
                {c.cert && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                    <BadgeCheck className="h-3 w-3" />
                    Certificate
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.blurb}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Cpu className="h-3.5 w-3.5" /> {c.level}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {c.hours}
                  </span>
                </span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-[image:var(--gradient-primary)] px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Start
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </li>
          ))}
        </ol>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-primary/40 bg-card p-10 text-center">
            <MoreHorizontal className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 font-mono text-sm text-primary">// nothing here yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              New courses added in the future will appear in this category. Check back soon.
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Courses are hosted by Kaggle. Taleem simply curates the order to follow — pair each one
          with flashcards and quizzes from your own notes.
        </p>

        <SiteFooter />
      </div>
    </main>
  );
}
