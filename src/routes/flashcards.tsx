import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, ListChecks } from "lucide-react";
import { loadFlashcardSet } from "@/lib/study-store";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — Taleem" },
      { name: "description", content: "Flip through flashcards generated from your notes." },
      { property: "og:title", content: "Flashcards — Taleem" },
      { property: "og:description", content: "Flip through flashcards generated from your notes." },
    ],
  }),
  component: Flashcards,
});

function Flashcards() {
  const [set] = useState(() => loadFlashcardSet());
  const cards = set.flashcards;
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[i];
  const progress = ((i + 1) / cards.length) * 100;

  const next = () => {
    setFlipped(false);
    setI((v) => Math.min(v + 1, cards.length - 1));
  };
  const prev = () => {
    setFlipped(false);
    setI((v) => Math.max(v - 1, 0));
  };
  const reset = () => {
    setFlipped(false);
    setI(0);
  };

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 sm:px-8 py-6">
        <SiteHeader />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Link to="/app" className="inline-flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> New notes
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={reset} className="inline-flex items-center gap-1 hover:text-foreground">
              <RotateCcw className="h-4 w-4" /> Restart
            </button>
            <Link to="/quiz" className="inline-flex items-center gap-1 hover:text-foreground">
              <ListChecks className="h-4 w-4" /> Quiz
            </Link>
          </div>
        </div>


        {set.topic && (
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary">{set.topic}</p>
        )}

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Card {i + 1} of {cards.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 flex-1">
          <button
            onClick={() => setFlipped((f) => !f)}
            className="group relative block h-[380px] w-full [perspective:1200px] sm:h-[420px]"
            aria-label="Flip card"
          >
            <div
              className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                flipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              <Face label="Question" text={card.front} />
              <Face label="Answer" text={card.back} back />
            </div>
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Tap the card to flip
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={prev}
            disabled={i === 0}
            className="h-12 flex-1 rounded-xl"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Prev
          </Button>
          <Button
            size="lg"
            onClick={next}
            disabled={i === cards.length - 1}
            className="h-12 flex-1 rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      <SiteFooter />
      </div>
    </main>
  );
}

function Face({ label, text, back }: { label: string; text: string; back?: boolean }) {
  return (
    <div
      className={`paper-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)] [backface-visibility:hidden] ${
        back ? "[transform:rotateY(180deg)]" : ""
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
        {label}
      </span>
      <p className="mt-6 text-lg font-medium leading-relaxed text-card-foreground sm:text-xl">
        {text}
      </p>
    </div>
  );
}