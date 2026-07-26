"use client";

import {
  Award,
  Blocks,
  CodeXml,
  GraduationCap,
  Rocket,
  Smartphone,
} from "lucide-react";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import { achievements, education, profile } from "@/app/data/profile";

const pillars = [
  {
    Icon: CodeXml,
    title: "Full-Stack Delivery",
    body: "React.js and .NET across the whole stack, from component design to stored procedures and CI/CD.",
  },
  {
    Icon: Smartphone,
    title: "Cross-Platform Mobile",
    body: "React Native apps with offline support, secure auth and real-time data sync used by 500+ people.",
  },
  {
    Icon: Blocks,
    title: "Systems & APIs",
    body: "RESTful and microservice architectures, query optimization and 20+ APIs tuned for speed.",
  },
  {
    Icon: Rocket,
    title: "Measurable Impact",
    body: "Shipped platforms that cut costs by ₹10.2 lakh a year and manual effort by up to 90%.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-24 size-[26rem] rounded-full bg-neon/5 blur-[120px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="About Me"
          title="Engineer behind the interface"
          subtitle="A quick look at how I work, what I have shipped, and where I come from."
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <Reveal direction="right">
            <div className="glass h-full rounded-3xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                Professional Summary
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
                {profile.summary}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
                {profile.summarySecondary}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {pillars.map(({ Icon, title, body }) => (
                  <div
                    key={title}
                    className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:shadow-[0_0_30px_-12px_#00f0ff]"
                  >
                    <Icon
                      className="size-5 text-neon transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <h4 className="mt-3 text-sm font-semibold text-foreground">
                      {title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal direction="left">
              <div className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Award className="size-5 text-neon" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold sm:text-xl">
                    Key Achievements
                  </h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {achievements.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_8px_1px_#00f0ff]"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <GraduationCap className="size-5 text-neon" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold sm:text-xl">
                    Education
                  </h3>
                </div>
                <div className="mt-5 space-y-5">
                  {education.map((edu) => (
                    <div
                      key={edu.degree}
                      className="border-l border-neon/25 pl-4"
                    >
                      <h4 className="text-sm font-semibold text-foreground">
                        {edu.degree}
                      </h4>
                      <p className="mt-1 text-xs text-muted">{edu.institute}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-muted">
                          {edu.period}
                        </span>
                        <span className="rounded-full border border-neon/25 bg-neon/5 px-2.5 py-1 text-neon">
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
