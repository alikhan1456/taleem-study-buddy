import { Link } from "@tanstack/react-router";
import { Sparkles, Layers, ListChecks, Home, Info } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="mb-10 flex flex-wrap items-center justify-between gap-3">
      <Link to="/" className="group flex items-center gap-2" aria-label="Taleem home">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground transition group-hover:scale-105">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-lg font-semibold tracking-tight">Taleem</span>
      </Link>

      <nav className="flex items-center gap-1 rounded-xl border border-border bg-card p-1 text-xs sm:text-sm">
        <NavItem to="/" icon={<Home className="h-4 w-4" />} label="Home" />
        <NavItem to="/flashcards" icon={<Layers className="h-4 w-4" />} label="Flashcards" />
        <NavItem to="/quiz" icon={<ListChecks className="h-4 w-4" />} label="Quiz" />
        <NavItem to="/about" icon={<Info className="h-4 w-4" />} label="About" />
      </nav>

      <ThemeToggle />
    </header>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "bg-primary/15 text-foreground" }}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}
