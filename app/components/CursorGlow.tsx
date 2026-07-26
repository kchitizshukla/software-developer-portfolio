"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Neon halo that trails the cursor.
 * Rendered only on md+ viewports (CSS) and only tracks fine pointers that
 * haven't asked for reduced motion (JS) — it stays parked off-screen otherwise.
 */
export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ left: sx, top: sy }}
        className="pointer-events-none fixed z-[60] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div className="size-8 rounded-full border border-neon/60 shadow-[0_0_18px_2px_rgba(0,240,255,0.35)]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ left: x, top: y }}
        className="pointer-events-none fixed z-[60] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_12px_3px_#00f0ff] md:block"
      />
    </>
  );
}
