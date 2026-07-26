import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, GraduationCap, Mail, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taleem — Study smarter with AI flashcards & quizzes" },
      { name: "description", content: "Taleem turns your notes into flashcards and quizzes. Founded by Malak Muhammad Ali." },
      { property: "og:title", content: "Taleem — Study smarter" },
      { property: "og:description", content: "Turn any notes into flashcards and quizzes in seconds." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10 sm:py-16">
        <header className="mb-12 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Taleem</span>
        </header>

        <section>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Learn deeper,
            <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              remember longer.
            </span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Taleem transforms your notes into flashcards and quizzes so studying feels
            lighter and sticks harder.
          </p>

          <blockquote className="mt-8 rounded-2xl border border-border bg-card p-5 text-sm italic text-card-foreground shadow-[var(--shadow-soft)] sm:text-base">
            "Education is the most powerful weapon which you can use to change the world."
            <footer className="mt-2 not-italic text-xs text-muted-foreground">— Nelson Mandela</footer>
          </blockquote>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-primary" />
            Meet the founder
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">Malak Muhammad Ali</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            An aspiring data scientist and A Levels Computer Science student at
            Beaconhouse. Malak built Taleem to help students turn scattered notes into
            structured practice — quickly, quietly, and without the overwhelm.
          </p>
          <a
            href="mailto:malikalikhan0305@gmail.com"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary/60"
          >
            <Mail className="h-4 w-4 text-primary" />
            malikalikhan0305@gmail.com
          </a>
        </section>

        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90 sm:w-auto"
          >
            <Link to="/app">
              Get your flashcards and quiz ready
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Built for focus.
        </footer>
      </div>
    </main>
  );
}