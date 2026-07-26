"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import { skillCategories } from "@/app/data/profile";

const marqueeItems = skillCategories
  .flatMap((c) => c.skills)
  .map((s) => s.name)
  .filter((name, i, arr) => arr.indexOf(name) === i);

function SkillBar({
  name,
  level,
  Icon,
  index,
}: {
  name: string;
  level: number;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 text-sm text-foreground">
          <Icon className="size-4 text-neon transition-transform duration-300 group-hover:scale-125" />
          {name}
        </span>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]"
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.15 + index * 0.05, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-neon-soft via-neon to-violet shadow-[0_0_12px_0_rgba(0,240,255,0.65)]"
        />
      </div>
    </motion.li>
  );
}

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const current =
    skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 size-[24rem] rounded-full bg-violet/8 blur-[120px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for"
          subtitle="Grouped by where they sit in the stack, with the depth I actually work at day to day."
        />

        <Reveal>
          <div
            role="tablist"
            aria-label="Skill categories"
            className="glass mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-1 rounded-2xl p-1.5"
          >
            {skillCategories.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActive(cat.id)}
                  className={`relative flex-1 rounded-xl px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 sm:text-sm ${
                    isActive ? "text-background" : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 -z-10 rounded-xl bg-neon shadow-[0_0_28px_-6px_#00f0ff]"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  {cat.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass mt-8 rounded-3xl p-6 sm:p-8"
        >
          <p className="text-center text-sm text-muted">{current.blurb}</p>
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {current.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                Icon={skill.icon}
                index={i}
              />
            ))}
          </ul>
        </motion.div>

        {/* Infinite ticker */}
        <div
          className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
          aria-hidden="true"
        >
          <div className="animate-marquee flex w-max gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs whitespace-nowrap text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
