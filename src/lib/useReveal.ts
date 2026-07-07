import { useEffect } from "react";

/**
 * Quiet scroll-reveal. Elements carrying the `data-reveal` attribute fade and
 * rise into place the first time they enter the viewport. Honours the user's
 * reduced-motion preference (handled in CSS) and only ever reveals — it never
 * hides content again, so nothing important can stay invisible.
 *
 * Call once per page (or in a layout). It picks up any `[data-reveal]` node
 * present after the current render, so it works for lists rendered from data.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")
    );
    if (nodes.length === 0) return;

    // No IntersectionObserver (or reduced motion preferred) → reveal at once.
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
