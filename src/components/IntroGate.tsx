import { useCallback, useEffect, useState } from "react";

import handsBound from "../assets/hands-bound.jpg";
import handsFree from "../assets/hands-free.jpg";

const KEY = "taleem:intro-seen";

/**
 * Cinematic intro: photoreal bound hands on a dark stage.
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
      }`}
    >
      {/* bound hands — dark stage */}
      <img
        src={handsBound}
        alt="Two hands bound together with rope"
        width={1280}
        height={1280}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out ${
          breaking ? "scale-105 opacity-0" : "intro-strain scale-100 opacity-100"
        }`}
      />
      {/* hands breaking free */}
      <img
        src={handsFree}
        alt="Hands breaking free from a snapped rope"
        width={1280}
        height={1280}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out ${
          breaking ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      />

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
