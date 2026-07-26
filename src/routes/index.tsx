import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers, ListChecks } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taleem — Turn notes into flashcards & quizzes" },
      { name: "description", content: "Paste your study notes and instantly generate flashcards and quizzes." },
      { property: "og:title", content: "Taleem — Study smarter" },
      { property: "og:description", content: "Paste notes, get flashcards and quizzes instantly." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const generate = (mode: "flashcards" | "quiz") => {
    // Notes will be used once AI is connected. Dummy data for now.
    navigate({ to: mode === "flashcards" ? "/flashcards" : "/quiz" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-10 sm:py-16">
        <header className="mb-10 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Taleem</span>
        </header>

        <section className="flex-1">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Turn your notes into
            <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              flashcards & quizzes.
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Paste anything you're studying. We'll do the rest.
          </p>

          <div className="mt-8">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your notes here… lecture transcripts, chapters, anything."
              className="min-h-[220px] w-full resize-y rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-card-foreground shadow-[var(--shadow-soft)] outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{notes.trim() ? `${notes.trim().split(/\s+/).length} words` : "0 words"}</span>
              <span>Dummy data mode</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => generate("flashcards")}
              className="h-12 flex-1 rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate({ to: "/flashcards" })}
              className="rounded-2xl border border-border bg-card p-4 text-left transition hover:border-primary/50"
            >
              <Layers className="h-5 w-5 text-primary" />
              <div className="mt-3 text-sm font-medium">Flashcards</div>
              <div className="text-xs text-muted-foreground">Flip & recall</div>
            </button>
            <button
              onClick={() => navigate({ to: "/quiz" })}
              className="rounded-2xl border border-border bg-card p-4 text-left transition hover:border-primary/50"
            >
              <ListChecks className="h-5 w-5 text-primary" />
              <div className="mt-3 text-sm font-medium">Quiz</div>
              <div className="text-xs text-muted-foreground">Test yourself</div>
            </button>
          </div>
        </section>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          Built for focus.
        </footer>
      </div>
    </main>
  );
}