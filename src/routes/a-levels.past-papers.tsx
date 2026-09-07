import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ScrollText } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/a-levels/past-papers")({
  head: () => ({
    meta: [
      { title: "A-Levels Past Papers | Taleem" },
      {
        name: "description",
        content: "A-Level past papers and marking schemes for practice.",
      },
      { property: "og:title", content: "A-Levels Past Papers — Taleem" },
      {
        property: "og:description",
        content: "Past papers and marking schemes for A-Level students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastPapersPage,
});

function PastPapersPage() {
  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-8 sm:px-8 sm:py-12">
        <SiteHeader />

        <section className="flex-1">
          <Link
            to="/a-levels"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to A-Levels
          </Link>

          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <ScrollText className="h-5 w-5" />
              </span>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Past Papers</h1>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This page will list A-Level past papers and marking schemes by year and subject. Resources will be added here soon.
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
