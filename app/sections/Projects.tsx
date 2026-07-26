"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionHeading from "@/app/components/SectionHeading";
import { projects, type Project } from "@/app/data/profile";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 220,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 220,
    damping: 20,
  });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={
        {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          "--accent": project.accent,
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className="group glass relative flex flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[0_0_50px_-18px_var(--accent)] sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: project.accent }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
            {project.title}
          </h3>
          <p
            className="mt-1 text-xs font-medium"
            style={{ color: project.accent }}
          >
            {project.subtitle}
          </p>
        </div>
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/25 group-hover:text-foreground"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <ul className="relative mt-5 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs text-muted">
            <Check
              className="mt-0.5 size-3.5 shrink-0"
              style={{ color: project.accent }}
              aria-hidden="true"
            />
            {h}
          </li>
        ))}
      </ul>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] text-muted transition-colors duration-300 group-hover:border-white/15"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(project.github || project.live) && (
        <div className="relative mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-neon"
            >
              <SiGithub className="size-3.5" aria-hidden="true" />
              Code
              <span className="sr-only">for {project.title}</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-neon"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              Live Demo
              <span className="sr-only">of {project.title}</span>
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-neon/6 blur-[130px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Projects"
          title="Things I have built"
          subtitle="Production systems and side projects — each one shipped, measured and used by real people."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
