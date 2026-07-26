"use client";

import type { ComponentType } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { navLinks, profile } from "@/app/data/profile";

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

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_20px_2px_rgba(0,240,255,0.45)]"
        aria-hidden="true"
      />

      <div className="container-page flex flex-col items-center gap-8 py-10 sm:py-12 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <a
            href="#home"
            className="font-display gradient-text text-lg font-bold tracking-widest"
          >
            {profile.name}
          </a>
          <p className="mt-2 text-xs text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs text-muted transition-colors hover:text-neon"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={label}
              className="glass inline-flex size-10 items-center justify-center rounded-xl text-muted transition-all duration-300 hover:text-neon hover:shadow-[0_0_24px_-6px_#00f0ff]"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="neon-border inline-flex size-10 items-center justify-center rounded-xl text-neon transition-all duration-300 hover:bg-neon/10"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="container-page border-t border-white/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}.
      </div>
    </footer>
  );
}
