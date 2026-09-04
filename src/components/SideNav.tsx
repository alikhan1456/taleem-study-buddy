import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Sparkles,
  Layers,
  ListChecks,
  Info,
  Mail,
  Linkedin,
  GraduationCap,
} from "lucide-react";
import logoImg from "@/assets/taleem-logo.png";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/app", label: "Generate", icon: Sparkles },
  { to: "/flashcards", label: "Flashcards", icon: Layers },
  { to: "/quiz", label: "Quiz", icon: ListChecks },
  { to: "/courses", label: "Free Courses", icon: GraduationCap },
  { to: "/about", label: "About", icon: Info },
];

export function SideNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation sidebar" : "Open navigation sidebar"}
        aria-expanded={open}
        className={`fixed top-1/2 z-50 inline-flex h-11 w-8 -translate-y-1/2 items-center justify-center rounded-r-xl border border-l-0 border-border bg-card text-muted-foreground shadow-[var(--shadow-soft)] transition-all hover:text-foreground ${
          open ? "left-60" : "left-0"
        }`}
      >
        {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-[1px] sm:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-60 border-r border-border bg-card/95 p-4 backdrop-blur transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-card border border-border">
            <img
              src={logoImg}
              alt=""
              className="h-7 w-7 object-contain"
              width={36}
              height={36}
            />
          </div>
          <span className="text-lg font-semibold tracking-tight">Taleem</span>
        </div>

        <nav className="space-y-1">
          {ITEMS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "bg-primary/15 text-foreground" }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 flex gap-2 border-t border-border pt-4">
          <a
            href="https://www.linkedin.com/in/malak-muhammad-ali-882650374"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:malikalikhan0305@gmail.com"
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </aside>
    </>
  );
}
