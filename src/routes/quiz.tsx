import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, RotateCcw, Trophy } from "lucide-react";
import { loadQuizSet } from "@/lib/study-store";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — Taleem" },
      { name: "description", content: "Test yourself with instant feedback quizzes." },
      { property: "og:title", content: "Quiz — Taleem" },
      { property: "og:description", content: "Test yourself with instant feedback quizzes." },
    ],
  }),
  component: Quiz,
});

function Quiz() {
  const [set] = useState(() => loadQuizSet());
  const qs = set.quiz;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = qs[i];
  const progress = ((i + (picked !== null ? 1 : 0)) / qs.length) * 100;

  const pick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= qs.length) {
      setDone(true);
      return;
    }
    setI((v) => v + 1);
    setPicked(null);
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / qs.length) * 100);
    return (
      <main className="min-h-screen text-foreground">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 py-10 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Trophy className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            {pct >= 80 ? "Excellent!" : pct >= 50 ? "Nice work." : "Keep going."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">You finished the quiz.</p>

          <div className="mt-8 w-full rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <div className="text-6xl font-semibold tracking-tight">
              {score}
              <span className="text-2xl text-muted-foreground">/{qs.length}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{pct}% correct</div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={restart}
              className="h-12 flex-1 rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Try again
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 flex-1 rounded-xl">
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 sm:px-8 py-6">
        <SiteHeader />
        <div className="flex items-center justify-between">
          <Link to="/app" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> New notes
          </Link>
          <span className="text-sm text-muted-foreground">Score {score}</span>
        </div>


        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Question {i + 1} of {qs.length}</span>
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
          <h2 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            {q.question}
          </h2>

          <div className="mt-6 space-y-3">
            {q.options.map((opt, idx) => {
              const isPicked = picked === idx;
              const isCorrect = idx === q.answer;
              const showState = picked !== null;
              const state =
                showState && isCorrect
                  ? "correct"
                  : showState && isPicked && !isCorrect
                    ? "wrong"
                    : "idle";
              return (
                <button
                  key={idx}
                  onClick={() => pick(idx)}
                  disabled={picked !== null}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm transition ${
                    state === "correct"
                      ? "border-[color:var(--success)] bg-[color:var(--success)]/10 text-foreground"
                      : state === "wrong"
                        ? "border-destructive bg-destructive/10 text-foreground"
                        : "border-border bg-card hover:border-primary/50"
                  } ${picked !== null && !isPicked && !isCorrect ? "opacity-50" : ""}`}
                >
                  <span>{opt}</span>
                  {state === "correct" && <Check className="h-4 w-4 text-[color:var(--success)]" />}
                  {state === "wrong" && <X className="h-4 w-4 text-destructive" />}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <p className="mt-6 text-sm text-muted-foreground">
              {picked === q.answer ? "Correct — nice." : "Not quite. The right answer is highlighted."}
            </p>
          )}
        </div>

        <Button
          size="lg"
          onClick={next}
          disabled={picked === null}
          className="mt-6 h-12 w-full rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
        >
          {i + 1 === qs.length ? "See score" : "Next question"}
        </Button>
      <SiteFooter />
      </div>
    </main>
  );
}