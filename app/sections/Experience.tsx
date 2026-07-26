"use client";

import { motion } from "framer-motion";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import SectionHeading from "@/app/components/SectionHeading";
import { experiences } from "@/app/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 size-[24rem] rounded-full bg-violet/8 blur-[120px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Experience"
          title="Where I have shipped"
          subtitle="Roles, timelines and the work that moved the numbers."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline spine */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-neon via-violet/50 to-transparent sm:left-[19px]"
          />

          <ol className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                <span
                  className="absolute top-1 left-0 flex size-8 items-center justify-center rounded-xl border border-neon/40 bg-background text-neon shadow-[0_0_22px_-6px_#00f0ff] sm:size-10"
                  aria-hidden="true"
                >
                  <Briefcase className="size-4" />
                  {exp.current && (
                    <span className="absolute inset-0 animate-pulse-ring rounded-xl border border-neon/60" />
                  )}
                </span>

                <div className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-16px_#00f0ff] sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold sm:text-xl">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="rounded-full border border-neon/30 bg-neon/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-neon uppercase">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm font-medium text-neon">
                    {exp.company}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {exp.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_8px_1px_#00f0ff]"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-muted">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
