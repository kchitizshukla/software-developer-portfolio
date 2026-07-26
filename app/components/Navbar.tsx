"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/app/data/profile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (drives the #hash nav state).
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-background/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-16 items-center justify-between sm:h-20"
        >
          <a
            href="#home"
            className="font-display group flex items-center gap-2 text-lg font-bold tracking-widest"
            aria-label={`${profile.name} — home`}
          >
            <span className="relative flex size-8 items-center justify-center rounded-lg border border-neon/40 bg-neon/5 text-neon shadow-[0_0_18px_-4px_#00f0ff] transition-transform duration-300 group-hover:scale-110">
              KS
            </span>
            <span className="hidden gradient-text sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-neon"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-neon/30 bg-neon/10 shadow-[0_0_22px_-6px_#00f0ff]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download
              className="neon-border hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neon transition-all duration-300 hover:bg-neon/10 hover:shadow-[0_0_28px_-4px_#00f0ff] sm:inline-flex"
            >
              <Download className="size-4" aria-hidden="true" />
              Resume
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass inline-flex size-10 items-center justify-center rounded-xl text-neon md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-gradient-to-r from-neon via-violet to-neon shadow-[0_0_12px_1px_rgba(0,240,255,0.6)]"
          aria-hidden="true"
        />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-4 mt-2 rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                      active === link.href
                        ? "bg-neon/10 text-neon"
                        : "text-muted hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2">
                <a
                  href={profile.resume}
                  download
                  onClick={() => setOpen(false)}
                  className="neon-border flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-neon"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
