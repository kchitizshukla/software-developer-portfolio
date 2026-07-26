"use client";

import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
      <Reveal direction="down">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.22em] text-neon uppercase">
          <span className="size-1.5 rounded-full bg-neon shadow-[0_0_10px_2px_#00f0ff]" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="gradient-text">{title}</span>
        </h2>
      </Reveal>

      {subtitle ? (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {subtitle}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.22} direction="none">
        <div className="mt-7 h-px w-40 bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_16px_2px_rgba(0,240,255,0.5)]" />
      </Reveal>
    </div>
  );
}
