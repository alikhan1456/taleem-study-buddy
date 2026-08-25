import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Brain,
  Wallet,
  FileUp,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Taleem — Free AI study tool by Malak Muhammad Ali" },
      {
        name: "description",
        content:
          "Why Taleem exists: a free, AI-built study companion that turns notes and PDFs into flashcards and quizzes for deeper understanding.",
      },
      { property: "og:title", content: "About Taleem" },
      {
        property: "og:description",
        content: "The story behind Taleem — a free AI study companion built by a student, for students.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 sm:px-8 py-8 sm:py-12">
        <SiteHeader />

        <article className="flex-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">About</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A study companion built by a student,
            <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              for students — and it's free.
            </span>
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Taleem was created by <strong className="text-foreground">Malak Muhammad Ali</strong>, an
            aspiring data scientist and A Levels Computer Science student at Beaconhouse. It started
            with a simple frustration: notes pile up faster than anyone can revise them, and the tools
            that help usually sit behind a paywall.
          </p>

          <h2 className="mt-10 text-xl font-semibold tracking-tight">How it was made</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The whole app was designed and built with the help of AI — from the interface to the
            study-set generation itself. Malak shaped the product, the prompts and the learning logic,
            then used AI as a collaborator to write and refine the code. Under the hood a language
            model reads your notes, identifies the key points, and writes 50 in-depth flashcards or a
            30-question multiple-choice quiz in structured form, so nothing important gets skipped.
            PDFs are read directly in your browser before the text is sent for generation.
          </p>

          <h2 className="mt-10 text-xl font-semibold tracking-tight">Why it exists</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Card
              icon={<Wallet className="h-5 w-5 text-primary" />}
              title="Free for everyone"
              text="No subscription, no account, no limits hidden behind a plan. Good revision shouldn't depend on what you can pay."
            />
            <Card
              icon={<Brain className="h-5 w-5 text-primary" />}
              title="Understanding, not cramming"
              text="Active recall and self-testing are two of the most reliable ways to remember. Taleem turns passive notes into both."
            />
            <Card
              icon={<FileUp className="h-5 w-5 text-primary" />}
              title="Works with your material"
              text="Paste up to 5,000 words or upload a PDF — lecture transcripts, textbook chapters, your own handwriting typed up."
            />
            <Card
              icon={<ShieldCheck className="h-5 w-5 text-primary" />}
              title="Calm and private"
              text="No sign-up and no profile. Your generated sets stay in your own browser session, not in a database."
            />
          </div>

          <h2 className="mt-10 text-xl font-semibold tracking-tight">How to get the most from it</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>• Feed it one topic at a time — focused notes produce sharper cards.</li>
            <li>• Flip through the flashcards first, then take the quiz to find your gaps.</li>
            <li>• Re-run the quiz a day later; spaced repetition is where the real gains are.</li>
            <li>• Always check answers against your syllabus — AI is a study aid, not a teacher.</li>
          </ul>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <HeartHandshake className="h-4 w-4 text-primary" />
              What's next
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Taleem is still growing — saved decks, progress tracking and subject-specific modes are
              on the way. Ideas and feedback from students shape what gets built next, so reach out
              anytime through the links below.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-5 h-12 rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
            >
              <Link to="/app">
                <Sparkles className="mr-2 h-4 w-4" />
                Start studying
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>

        <SiteFooter />
      </div>
    </main>
  );
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-primary/50">
      {icon}
      <div className="mt-3 text-sm font-medium">{title}</div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
