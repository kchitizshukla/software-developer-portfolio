"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/app/data/profile";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18 + 6;
        return next >= 100 ? 100 : next;
      });
    }, 130);

    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const timer = setTimeout(() => setDone(true), 320);
    return () => clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center"
          >
            <div className="font-display relative text-3xl font-bold tracking-[0.35em] sm:text-4xl">
              <span className="gradient-text">KS</span>
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-neon/40" />
            </div>

            <p className="mt-6 text-[11px] tracking-[0.4em] text-muted uppercase">
              {profile.role}
            </p>

            <div className="mt-6 h-px w-56 overflow-hidden bg-white/10 sm:w-72">
              <motion.div
                className="h-full bg-gradient-to-r from-neon to-violet shadow-[0_0_12px_2px_rgba(0,240,255,0.6)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.25 }}
              />
            </div>

            <span className="mt-3 font-mono text-xs text-neon">
              {Math.floor(progress)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
