import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  FileText,
  MoreHorizontal,
  School,
  ScrollText,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/a-levels/")({
  head: () => ({
    meta: [
      { title: "A-Levels Resources — Notes, Books & Past Papers | Taleem" },
      {
        name: "description",
        content:
          "A-level study resources organised by notes, books, past papers and extras — curated for Pakistani O & A Levels students.",
      },
      { property: "og:title", content: "A-Levels Resources — Taleem" },
      {
        property: "og:description",
        content:
          "Notes, books, past papers and more for A-Level students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ALevelsIndex,
});

const OPTIONS = [
  {
    to: "/a-levels/notes",
    icon: FileText,
    title: "Notes",
    description: "Concise topic summaries and revision notes by subject.",
  },
  {
    to: "/a-levels/books",
    icon: BookOpen,
    title: "Books",
    description: "Recommended textbooks and reference books for each subject.",
  },
  {
    to: "/a-levels/past-papers",
    icon: ScrollText,
    title: "Past Papers",
    description: "Previous years' papers to practise and mark your progress.",
  },
  {
    to: "/a-levels/other-resources",
    icon: MoreHorizontal,
    title: "Other Resources",
    description: "Useful links, videos, formula sheets and extras.",
  },
];

function ALevelsIndex() {
  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-12">
        <SiteHeader />

        <section className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <School className="h-3.5 w-3.5" />
            O & A Levels
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A-Levels resources,
            <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              sorted for you.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Pick a category below. Each page will hold subject-specific notes, books, past papers and extra links — curated for Pakistani O & A Levels students.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {OPTIONS.map((option, i) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.to}
                  to={option.to}
                  className="group animate-fade-up relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1.5 hover:border-primary/60"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-[image:var(--gradient-primary)] transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/50 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold tracking-tight">{option.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
