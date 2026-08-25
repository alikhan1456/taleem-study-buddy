import { useCallback, useEffect, useState } from "react";

const KEY = "taleem:intro-seen";

/**
 * Full-screen intro: two bound hands wrapped in the "rope of illiteracy".
 * A click, tap, scroll or key press snaps the rope and reveals the site.
 */
export function IntroGate() {
  const [show, setShow] = useState(false);
  const [breaking, setBreaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setShow(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const release = useCallback(() => {
    setBreaking((b) => {
      if (b) return b;
      sessionStorage.setItem(KEY, "1");
      window.setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
      }, 950);
      return true;
    });
  }, []);

  useEffect(() => {
    if (!show) return;
    const opts = { passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", release, opts);
    window.addEventListener("touchmove", release, opts);
    window.addEventListener("keydown", release);
    return () => {
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", release);
    };
  }, [show, release]);

  if (!show) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Break the rope and enter Taleem"
      onClick={release}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[image:var(--gradient-primary)] px-6 text-center transition-opacity duration-500 ${
        breaking ? "pointer-events-none opacity-0 delay-300" : "opacity-100"
      } ${breaking ? "intro-break" : ""}`}
    >
      <div className="absolute inset-0 paper-texture opacity-25" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/80">Taleem</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary-foreground sm:text-5xl">
          Break the handcuffs of illiteracy
        </h1>

        <svg
          viewBox="0 0 320 150"
          className={`mx-auto mt-8 w-[280px] sm:w-[360px] ${breaking ? "" : "intro-strain"}`}
          aria-hidden="true"
        >
          <g fill="none" stroke="currentColor" className="text-primary-foreground" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            {/* left hand */}
            <g className="intro-hand-left">
              <path d="M20 120 C 40 118, 58 108, 70 92" />
              <path d="M70 92 c 6 -12, 10 -26, 8 -38" />
              <path d="M84 96 c 8 -14, 12 -30, 10 -44" />
              <path d="M98 100 c 8 -12, 12 -24, 12 -34" />
              <path d="M62 104 c -8 -10, -14 -20, -14 -30" />
              <path d="M70 92 c 14 4, 28 8, 42 8" />
            </g>
            {/* right hand */}
            <g className="intro-hand-right">
              <path d="M300 120 C 280 118, 262 108, 250 92" />
              <path d="M250 92 c -6 -12, -10 -26, -8 -38" />
              <path d="M236 96 c -8 -14, -12 -30, -10 -44" />
              <path d="M222 100 c -8 -12, -12 -24, -12 -34" />
              <path d="M258 104 c 8 -10, 14 -20, 14 -30" />
              <path d="M250 92 c -14 4, -28 8, -42 8" />
            </g>
            {/* rope */}
            <g strokeWidth="8" className="text-primary-foreground/85">
              <path className="intro-rope-left" d="M112 96 q 24 -12, 48 -12" strokeDasharray="10 7" />
              <path className="intro-rope-right" d="M208 96 q -24 -12, -48 -12" strokeDasharray="10 7" />
              <path className="intro-rope-left" d="M112 112 q 24 12, 48 12" strokeDasharray="10 7" />
              <path className="intro-rope-right" d="M208 112 q -24 12, -48 12" strokeDasharray="10 7" />
            </g>
          </g>
        </svg>

        <p className="mt-8 animate-pulse text-sm text-primary-foreground/85">
          Click anywhere or scroll to break free
        </p>
      </div>
    </div>
  );
}
