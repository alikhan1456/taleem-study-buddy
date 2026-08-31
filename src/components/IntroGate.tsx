import { useCallback, useEffect, useState } from "react";

const KEY = "taleem:intro-seen";

/**
 * Cinematic intro: two hands bound by a rope of illiteracy on a dark stage.
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
      }, 1500);
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
      className={`fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[oklch(0.13_0.01_60)] transition-opacity duration-700 ${
        breaking ? "pointer-events-none opacity-0 delay-700" : "opacity-100"
      } ${breaking ? "intro-break" : ""}`}
    >
      {/* stage glow */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_42%,oklch(0.32_0.06_55/0.55),transparent_75%)]" />

      {/* bound hands illustration */}
      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 320 220"
          className="intro-strain w-72 max-w-[80vw] sm:w-96"
          aria-hidden="true"
        >
          {/* left hand */}
          <g className="intro-hand-left">
            <rect x="52" y="86" width="86" height="48" rx="24" fill="oklch(0.78 0.07 75)" />
            <rect x="52" y="86" width="86" height="48" rx="24" fill="oklch(0.4 0.05 60 / 0.25)" />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={60 + i * 19}
                y="66"
                width="13"
                height="30"
                rx="6.5"
                fill="oklch(0.8 0.07 75)"
              />
            ))}
          </g>
          {/* right hand */}
          <g className="intro-hand-right">
            <rect x="182" y="86" width="86" height="48" rx="24" fill="oklch(0.78 0.07 75)" />
            <rect x="182" y="86" width="86" height="48" rx="24" fill="oklch(0.4 0.05 60 / 0.25)" />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={190 + i * 19}
                y="66"
                width="13"
                height="30"
                rx="6.5"
                fill="oklch(0.8 0.07 75)"
              />
            ))}
          </g>
          {/* rope */}
          <g stroke="oklch(0.55 0.09 55)" strokeWidth="9" strokeLinecap="round" fill="none">
            <path className="intro-rope-left" d="M160 108 C 132 96, 108 96, 84 112" />
            <path className="intro-rope-right" d="M160 108 C 188 96, 212 96, 236 112" />
            <path className="intro-rope-left" d="M160 120 C 130 132, 104 130, 80 118" opacity="0.8" />
            <path className="intro-rope-right" d="M160 120 C 190 132, 216 130, 240 118" opacity="0.8" />
          </g>
          {/* knot */}
          <circle cx="160" cy="112" r="12" fill="oklch(0.5 0.09 55)" />
        </svg>
      </div>

      {/* cinematic vignette + text scrim */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_25%,oklch(0.08_0.01_60/0.75)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,oklch(0.08_0.01_60/0.95),transparent)]" />

      <div className="relative flex h-full flex-col items-center justify-end px-6 pb-16 text-center sm:pb-24">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[oklch(0.85_0.05_75)]">Taleem</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[oklch(0.97_0.01_90)] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-5xl">
          Break the handcuffs of illiteracy
        </h1>
        <p className="mt-6 animate-pulse text-sm text-[oklch(0.9_0.02_90)]/80">
          Click anywhere, swipe or scroll to break free
        </p>
      </div>
    </div>
  );
}
