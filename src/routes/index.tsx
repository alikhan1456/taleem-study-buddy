import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardPaste, FileUp, Layers, ListChecks, Quote } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import studentImg from "@/assets/student.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taleem — Study smarter with AI flashcards & quizzes" },
      { name: "description", content: "Taleem turns your notes or PDFs into 50 flashcards and a 30-question quiz. Founded by Malak Muhammad Ali." },
      { property: "og:title", content: "Taleem — Study smarter" },
      { property: "og:description", content: "Turn any notes or PDF into flashcards and quizzes in seconds." },
    ],
  }),
  component: Home,
});

const QUOTES = [
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Seek knowledge from the cradle to the grave.", author: "Arabic proverb" },
];

function Home() {
  const [q, setQ] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setQ((v) => (v + 1) % QUOTES.length), 3000);
    return () => clearInterval(id);
  }, [paused]);

  const quote = QUOTES[q];

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 sm:px-8 py-8 sm:py-12">
        <SiteHeader />

        <section className="grid items-center gap-6 sm:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Learn deeper,
              <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                remember longer.
              </span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Taleem turns your notes — pasted or uploaded as a PDF — into 50 in-depth
              flashcards and a 30-question quiz.
            </p>
          </div>
          <img
            src={studentImg}
            alt="Illustration of a student studying with floating books and flashcards"
            width={768}
            height={768}
            className="animate-float mx-auto w-40 drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] sm:w-full"
          />
        </section>

        {/* Rotating quotes */}
        <section
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.6)]"
        >
          <Quote className="h-5 w-5 text-primary" />
          <blockquote key={q} className="animate-fade-up mt-3 min-h-[72px] text-base italic leading-relaxed text-card-foreground sm:text-lg">
            "{quote.text}"
            <footer className="mt-2 not-italic text-xs text-muted-foreground">— {quote.author}</footer>
          </blockquote>
          <div className="mt-4 flex gap-1.5">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                aria-label={`Show quote ${i + 1}`}
                onClick={() => setQ(i)}
                className={`h-1.5 rounded-full transition-all ${i === q ? "w-6 bg-primary" : "w-2 bg-muted"}`}
              />
            ))}
          </div>
        </section>

        {/* Tutorial */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-1 text-sm text-muted-foreground">Three steps, about a minute.</p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            <Step n={1} icon={<ClipboardPaste className="h-5 w-5 text-primary" />} title="Add your notes" text="Paste up to 5,000 words, or upload a PDF and we'll read it for you." />
            <Step n={2} icon={<FileUp className="h-5 w-5 text-primary" />} title="Pick a mode" text="Generate 50 flashcards or a 30-question quiz — separately, whenever you need." />
            <Step n={3} icon={<Layers className="h-5 w-5 text-primary" />} title="Study & test" text="Flip cards to recall, then take the quiz for instant feedback and a score." />
          </ol>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 flex-1 rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
            >
              <Link to="/app">
                Get your flashcards and quiz ready
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl">
              <Link to="/flashcards"><Layers className="mr-2 h-4 w-4" /> Flashcards</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl">
              <Link to="/quiz"><ListChecks className="mr-2 h-4 w-4" /> Quiz</Link>
            </Button>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}


function Step({ n, icon, title, text }: { n: number; icon: React.ReactNode; title: string; text: string }) {
  return (
    <li className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-primary/50">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-semibold text-muted-foreground">Step {n}</span>
      </div>
      <div className="mt-3 text-sm font-medium">{title}</div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </li>
  );
}
