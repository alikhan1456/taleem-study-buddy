import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/a-levels/books")({
  head: () => ({
    meta: [
      { title: "A-Levels Books | Taleem" },
      {
        name: "description",
        content: "Recommended textbooks and reference books for A-Level subjects.",
      },
      { property: "og:title", content: "A-Levels Books — Taleem" },
      {
        property: "og:description",
        content: "Textbooks and reference books for A-Level students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
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
                <BookOpen className="h-5 w-5" />
              </span>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Books</h1>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This page will list recommended A-Level textbooks and reference books. Resources will be added here soon.
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
