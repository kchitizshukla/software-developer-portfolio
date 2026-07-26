"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import ParticleField from "@/app/components/ParticleField";
import TypeWriter from "@/app/components/TypeWriter";
import { profile, stats } from "@/app/data/profile";

type Social = {
  label: string;
  href: string;
  Icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
};

const socials: Social[] = [
  { label: "GitHub", href: profile.github, Icon: SiGithub },
  { label: "LinkedIn", href: profile.linkedin, Icon: FaLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* Background layers */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <ParticleField />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-neon/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-[30rem] rounded-full bg-violet/10 blur-[130px]"
      />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-neon" />
              </span>
              Open to new opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display mt-6 leading-[1.05] font-bold tracking-tight"
            >
              <span className="block text-xl font-medium text-muted sm:text-2xl">
                Hi, I&apos;m
              </span>
              <span className="relative mt-1 block">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -inset-y-6 -z-10 bg-neon/10 blur-3xl"
                />
                <span className="name-shine block text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem]">
                  {profile.name}
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-4 text-lg font-medium sm:text-xl md:text-2xl"
            >
              <span className="text-muted">I design and build </span>
              <TypeWriter words={profile.titles} className="font-display" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:mx-0"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-neon px-7 py-3 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_40px_-6px_#00f0ff] sm:w-auto"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                View Projects
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>

              <a
                href={profile.resume}
                download
                className="neon-border inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-neon transition-all duration-300 hover:bg-neon/10 hover:shadow-[0_0_32px_-6px_#00f0ff] sm:w-auto"
              >
                <Download className="size-4" aria-hidden="true" />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="glass inline-flex size-11 items-center justify-center rounded-xl text-muted transition-all duration-300 hover:-translate-y-1 hover:text-neon hover:shadow-[0_0_28px_-6px_#00f0ff]"
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </a>
              ))}
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="size-3.5 text-neon" aria-hidden="true" />
                {profile.location}
              </span>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none"
          >
            <div className="animate-float relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-neon/25 via-transparent to-violet/25 blur-2xl"
              />
              <div className="glass relative overflow-hidden rounded-[2rem] p-2 shadow-[0_0_60px_-24px_rgba(0,240,255,0.7)]">
                <div className="relative overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={profile.avatar}
                    alt={`Portrait of ${profile.name}`}
                    width={900}
                    height={1600}
                    priority
                    sizes="(max-width: 1024px) 80vw, 400px"
                    className="h-auto w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-neon/12 to-transparent"
                  />
                </div>
              </div>

              <div className="glass absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl px-4 py-3 text-center">
                <p className="font-display text-xs tracking-[0.24em] text-neon uppercase">
                  {profile.role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:mt-20 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col-reverse bg-white/[0.015] px-4 py-6 text-center transition-colors duration-300 hover:bg-neon/5"
            >
              <dt className="mt-1.5 text-[11px] tracking-wide text-muted sm:text-xs">
                {stat.label}
              </dt>
              <dd className="font-display text-2xl font-bold text-neon transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mx-auto mt-12 hidden w-fit flex-col items-center gap-2 text-muted transition-colors hover:text-neon lg:flex"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" aria-hidden="true" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
