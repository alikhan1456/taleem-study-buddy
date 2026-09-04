import { Link } from "@tanstack/react-router";
import { Layers, ListChecks, Home, Info, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoImg from "@/assets/taleem-logo.png";

export function SiteHeader() {
  return (
    <header className="mb-10 flex flex-wrap items-center justify-between gap-3">
      <Link to="/" className="group flex items-center gap-2" aria-label="Taleem home">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card border border-border transition group-hover:scale-105">
          <img
            src={logoImg}
            alt=""
            className="h-7 w-7 object-contain"
            width={36}
            height={36}
          />
        </div>
        <span className="text-lg font-semibold tracking-tight">Taleem</span>
      </Link>

      <div className="order-2 sm:order-3">
        <ThemeToggle />
      </div>

      <nav className="order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 text-xs sm:order-2 sm:mx-0 sm:w-auto sm:text-sm">
        <NavItem to="/" icon={<Home className="h-4 w-4" />} label="Home" />
        <NavItem to="/flashcards" icon={<Layers className="h-4 w-4" />} label="Flashcards" />
        <NavItem to="/quiz" icon={<ListChecks className="h-4 w-4" />} label="Quiz" />
        <NavItem to="/courses" icon={<GraduationCap className="h-4 w-4" />} label="Courses" />
        <NavItem to="/about" icon={<Info className="h-4 w-4" />} label="About" />
      </nav>
    </header>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "bg-primary/15 text-foreground" }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}
