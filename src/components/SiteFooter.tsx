import { Link } from "@tanstack/react-router";
import { GraduationCap, Linkedin, Mail, Layers, ListChecks, Home, Info, Sparkles } from "lucide-react";

const LINKEDIN = "https://www.linkedin.com/in/malak-muhammad-ali-882650374";
const EMAIL = "malikalikhan0305@gmail.com";

export function SiteFooter() {
  return (
    <footer className="relative left-1/2 mt-16 w-screen -translate-x-1/2 border-t-2 border-primary/30 bg-footer text-footer-foreground shadow-[0_-14px_40px_-24px_oklch(0_0_0/0.35)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-2 pt-10 sm:grid-cols-[1.4fr_1fr] sm:px-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-footer-foreground/70">
            <GraduationCap className="h-4 w-4 text-primary" />
            Meet the founder
          </div>
          <h2 className="mt-3 text-lg font-semibold tracking-tight">Malak Muhammad Ali</h2>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-footer-foreground/70">
            An aspiring data scientist and A Levels Computer Science student at Beaconhouse.
            Malak built Taleem to help students turn scattered notes into structured practice —
            free, focused and calm.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Malak Muhammad Ali on LinkedIn"
              title="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-footer-foreground/15 bg-footer-foreground/5 text-footer-foreground/70 transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-footer-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Email ${EMAIL}`}
              title="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-footer-foreground/15 bg-footer-foreground/5 text-footer-foreground/70 transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-footer-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-xs text-footer-foreground/70 underline-offset-4 hover:text-footer-foreground hover:underline"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <div className="text-xs uppercase tracking-widest text-footer-foreground/70">Explore</div>
          <ul className="mt-3 space-y-2">
            <FooterLink to="/" icon={<Home className="h-3.5 w-3.5" />} label="Home" />
            <FooterLink to="/app" icon={<Sparkles className="h-3.5 w-3.5" />} label="Generate" />
            <FooterLink to="/flashcards" icon={<Layers className="h-3.5 w-3.5" />} label="Flashcards" />
            <FooterLink to="/quiz" icon={<ListChecks className="h-3.5 w-3.5" />} label="Quiz" />
            <FooterLink to="/about" icon={<Info className="h-3.5 w-3.5" />} label="About Taleem" />
          </ul>
        </nav>
      </div>

      <div className="mt-10 border-t border-footer-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-footer-foreground/70 sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} Taleem — built for focus.</span>
        <span>Free study tools for every student.</span>
      </div>
    </footer>
  );
}

function FooterLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
      >
        {icon}
        {label}
      </Link>
    </li>
  );
}
