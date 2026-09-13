import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cpu, Download, FileText, ScrollText } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import s21 from "@/assets/papers/9618_s21_qp_22.pdf.asset.json";
import s22 from "@/assets/papers/9618_s22_qp_22.pdf.asset.json";
import s23 from "@/assets/papers/9618_s23_qp_22.pdf.asset.json";
import s24 from "@/assets/papers/9618_s24_qp_22.pdf.asset.json";
import s25 from "@/assets/papers/9618_s25_qp_22.pdf.asset.json";
import w21 from "@/assets/papers/9618_w21_qp_22.pdf.asset.json";
import w22 from "@/assets/papers/9618_w22_qp_22.pdf.asset.json";
import w23 from "@/assets/papers/9618_w23_qp_22.pdf.asset.json";
import w24 from "@/assets/papers/9618_w24_qp_22.pdf.asset.json";
import w25 from "@/assets/papers/9618_w25_qp_22.pdf.asset.json";

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

const PAPER_2 = [
  { label: "May/June 2021", url: s21.url },
  { label: "October/November 2021", url: w21.url },
  { label: "May/June 2022", url: s22.url },
  { label: "October/November 2022", url: w22.url },
  { label: "May/June 2023", url: s23.url },
  { label: "October/November 2023", url: w23.url },
  { label: "May/June 2024", url: s24.url },
  { label: "October/November 2024", url: w24.url },
  { label: "May/June 2025", url: s25.url },
  { label: "October/November 2025", url: w25.url },
];

function PaperList({
  papers,
}: {
  papers: { label: string; url: string }[];
}) {
  if (papers.length === 0) {
    return (
      <p className="mt-3 text-sm italic text-muted-foreground">
        Papers will be added here soon.
      </p>
    );
  }
  return (
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
      {papers.map((paper) => (
        <li key={paper.label}>
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium transition hover:border-primary/60 hover:bg-muted/70"
          >
            <span className="inline-flex items-center gap-2.5">
              <FileText className="h-4 w-4 text-primary" />
              {paper.label}
            </span>
            <Download className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
          </a>
        </li>
      ))}
    </ul>
  );
}

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

          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <ScrollText className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Past Papers</h1>
          </div>

          {/* Subject: Computer Science */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50 text-primary">
                <Cpu className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                  Computer Science (9618)
                </h2>
                <p className="text-xs text-muted-foreground">Cambridge International A Level</p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Paper 1 — Theory Fundamentals
                </h3>
                <PaperList papers={[]} />
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Paper 2 — Fundamental Problem-solving & Programming
                </h3>
                <PaperList papers={PAPER_2} />
              </section>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
