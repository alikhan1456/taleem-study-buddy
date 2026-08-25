import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Layers, ListChecks, Loader2, FileUp, X } from "lucide-react";
import { generateFlashcards, generateQuiz } from "@/lib/study.functions";
import { saveFlashcardSet, saveQuizSet } from "@/lib/study-store";
import { extractPdfText } from "@/lib/pdf-text";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import studentImg from "@/assets/student.png";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Generate — Taleem flashcards & quizzes from your notes" },
      { name: "description", content: "Paste up to 5,000 words or upload a PDF and generate 50 flashcards or a 30-question quiz." },
      { property: "og:title", content: "Generate study sets — Taleem" },
      { property: "og:description", content: "Paste notes or upload a PDF, get flashcards and quizzes instantly." },
    ],
  }),
  component: Generate,
});

const MAX_WORDS = 5000;

function Generate() {
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState<null | "flashcards" | "quiz" | "pdf">(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const makeFlashcards = useServerFn(generateFlashcards);
  const makeQuiz = useServerFn(generateQuiz);

  const words = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  const describe = (e: unknown) => {
    const msg = e instanceof Error ? e.message : "Something went wrong.";
    if (msg.includes("429")) return "Rate limit hit — please try again in a moment.";
    if (msg.includes("402")) return "AI credits exhausted. Add credits in workspace billing.";
    return msg;
  };

  const handlePdf = async (file: File) => {
    setError(null);
    setBusy("pdf");
    try {
      const text = await extractPdfText(file);
      if (text.length < 50) {
        setError("We couldn't read text from that PDF (it may be a scan).");
        return;
      }
      setFileName(file.name);
      setNotes(text.split(/\s+/).slice(0, MAX_WORDS).join(" "));
    } catch (e) {
      setError(describe(e));
    } finally {
      setBusy(null);
    }
  };

  const run = async (mode: "flashcards" | "quiz") => {
    if (notes.trim().length < 10) {
      setError("Paste a bit more so we have something to work with.");
      return;
    }
    setError(null);
    setBusy(mode);
    const payload = { data: { notes: notes.trim().split(/\s+/).slice(0, MAX_WORDS).join(" ") } };
    try {
      if (mode === "flashcards") {
        saveFlashcardSet(await makeFlashcards(payload));
        navigate({ to: "/flashcards" });
      } else {
        saveQuizSet(await makeQuiz(payload));
        navigate({ to: "/quiz" });
      }
    } catch (e) {
      setError(describe(e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-5 sm:px-8 py-8 sm:py-12">
        <SiteHeader />

        <section className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Turn your notes into
                <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  flashcards & quizzes.
                </span>
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Paste up to {MAX_WORDS.toLocaleString()} words, or upload a PDF.
              </p>
            </div>
            <img
              src={studentImg}
              alt=""
              aria-hidden
              loading="lazy"
              width={768}
              height={768}
              className="animate-float hidden w-28 sm:block"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handlePdf(f);
                e.target.value = "";
              }}
            />
            <Button
              variant="outline"
              onClick={() => fileRef.current?.click()}
              disabled={busy !== null}
              className="rounded-xl"
            >
              {busy === "pdf" ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Reading PDF…</>
              ) : (
                <><FileUp className="mr-2 h-4 w-4" /> Upload a PDF</>
              )}
            </Button>
            {fileName && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                {fileName}
                <button
                  aria-label="Remove file"
                  onClick={() => {
                    setFileName(null);
                    setNotes("");
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
          </div>

          <div className="mt-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={busy !== null}
              placeholder="Paste your notes here… lecture transcripts, chapters, anything."
              className="min-h-[220px] w-full resize-y rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-card-foreground shadow-[var(--shadow-soft)] outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span className={words > MAX_WORDS ? "text-destructive" : ""}>
                {words.toLocaleString()} / {MAX_WORDS.toLocaleString()} words
              </span>
              <span>Powered by AI</span>
            </div>
            {error && (
              <p className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive-foreground">
                {error}
              </p>
            )}
          </div>

          <h2 className="mt-8 text-sm font-medium text-muted-foreground">Choose what to generate</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => run("flashcards")}
              disabled={busy !== null}
              className="rounded-2xl border border-border bg-card p-5 text-left transition hover:-translate-y-1 hover:border-primary/50 disabled:opacity-60"
            >
              {busy === "flashcards" ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <Layers className="h-5 w-5 text-primary" />
              )}
              <div className="mt-3 text-sm font-medium">50 Flashcards</div>
              <div className="text-xs text-muted-foreground">In-depth, covers every key point</div>
            </button>
            <button
              onClick={() => run("quiz")}
              disabled={busy !== null}
              className="rounded-2xl border border-border bg-card p-5 text-left transition hover:-translate-y-1 hover:border-primary/50 disabled:opacity-60"
            >
              {busy === "quiz" ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <ListChecks className="h-5 w-5 text-primary" />
              )}
              <div className="mt-3 text-sm font-medium">30 Quiz questions</div>
              <div className="text-xs text-muted-foreground">MCQs with instant feedback</div>
            </button>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
