import { Pencil, BookOpen, NotebookPen, Ruler, Calculator, Sigma, GraduationCap, Lightbulb, FlaskConical, PenLine } from "lucide-react";

type Item = {
  Icon: typeof Pencil;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  rotate: string;
};

const ITEMS: Item[] = [
  { Icon: Pencil, left: "6%", top: "12%", size: "h-10 w-10", delay: "0s", duration: "11s", rotate: "-18deg" },
  { Icon: BookOpen, left: "82%", top: "8%", size: "h-14 w-14", delay: "1.4s", duration: "13s", rotate: "12deg" },
  { Icon: Sigma, left: "48%", top: "5%", size: "h-9 w-9", delay: "2.2s", duration: "9s", rotate: "6deg" },
  { Icon: NotebookPen, left: "12%", top: "48%", size: "h-12 w-12", delay: "0.8s", duration: "14s", rotate: "10deg" },
  { Icon: Calculator, left: "88%", top: "42%", size: "h-11 w-11", delay: "2.8s", duration: "12s", rotate: "-8deg" },
  { Icon: Ruler, left: "70%", top: "68%", size: "h-12 w-12", delay: "1.1s", duration: "10s", rotate: "24deg" },
  { Icon: GraduationCap, left: "22%", top: "78%", size: "h-12 w-12", delay: "3.1s", duration: "15s", rotate: "-12deg" },
  { Icon: Lightbulb, left: "56%", top: "88%", size: "h-9 w-9", delay: "0.4s", duration: "11s", rotate: "8deg" },
  { Icon: FlaskConical, left: "38%", top: "34%", size: "h-10 w-10", delay: "2s", duration: "16s", rotate: "-6deg" },
  { Icon: PenLine, left: "92%", top: "82%", size: "h-10 w-10", delay: "1.7s", duration: "12s", rotate: "18deg" },
];

const FORMULAS = [
  { text: "E = mc²", left: "28%", top: "18%", delay: "0.6s", duration: "13s" },
  { text: "a² + b² = c²", left: "64%", top: "28%", delay: "2.4s", duration: "15s" },
  { text: "∫ f(x) dx", left: "16%", top: "64%", delay: "1.2s", duration: "12s" },
  { text: "H₂O", left: "78%", top: "56%", delay: "3s", duration: "10s" },
  { text: "π r²", left: "44%", top: "72%", delay: "1.9s", duration: "14s" },
];

export function StudyBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background paper-texture">
      <div className="absolute inset-0 bg-[image:var(--gradient-canvas)]" />
      {ITEMS.map(({ Icon, left, top, size, delay, duration, rotate }, idx) => (
        <div
          key={idx}
          className="animate-drift absolute text-primary/25"
          style={{ left, top, animationDelay: delay, animationDuration: duration, transform: `rotate(${rotate})` }}
        >
          <Icon className={size} strokeWidth={1.25} />
        </div>
      ))}
      {FORMULAS.map((f, idx) => (
        <span
          key={idx}
          className="animate-drift absolute font-serif text-2xl text-accent-foreground/20 sm:text-3xl"
          style={{ left: f.left, top: f.top, animationDelay: f.delay, animationDuration: f.duration }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}
