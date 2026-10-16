import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";

/**
 * Same Fade animation used by the original portfolio, but granular and optional.
 * Respects the visitor's OS reduced-motion preference (including live changes).
 * Keep ONE HTML element as a direct child to preserve CSS grid layouts.
 */
function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function PortfolioReveal({
  children,
  delay = 0,
  duration = 850,
  distance = "26px",
  direction = "bottom",
}) {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(media.matches);

    onChange();
    if (media.addEventListener) {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }
    if (media.addListener) {
      media.addListener(onChange);
      return () => media.removeListener(onChange);
    }
    return undefined;
  }, []);

  if (reducedMotion) return <>{children}</>;

  return (
    <Fade
      bottom={direction === "bottom"}
      left={direction === "left"}
      right={direction === "right"}
      duration={duration}
      distance={distance}
      delay={delay}
    >
      {children}
    </Fade>
  );
}
