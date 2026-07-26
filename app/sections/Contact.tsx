"use client";

import { useState, type ComponentType, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import { profile } from "@/app/data/profile";

type Status = "idle" | "loading" | "success" | "error";

type Channel = {
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
};

const channels: Channel[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    Icon: Phone,
  },
  {
    label: "GitHub",
    value: "github.com/kchitizshukla",
    href: profile.github,
    Icon: SiGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kchitiz-shukla",
    href: profile.linkedin,
    Icon: FaLinkedin,
  },
];

function Field({
  id,
  label,
  type = "text",
  textarea = false,
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const shared =
    "peer w-full rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3.5 text-sm text-foreground placeholder-transparent outline-none transition-all duration-300 focus:border-neon/50 focus:bg-neon/[0.03] focus:shadow-[0_0_28px_-10px_#00f0ff]";

  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} placeholder={label} rows={5} className={shared} {...rest} />
      ) : (
        <input id={id} type={type} placeholder={label} className={shared} {...rest} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute -top-2.5 left-3 rounded-full bg-background px-2 text-[11px] text-muted transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:text-neon"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");

      setStatus("success");
      setMessage(json.message);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Could not send your message.",
      );
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/6 blur-[140px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          subtitle="Have a role, a project or just a good idea? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal direction="right">
            <div className="glass flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
              <div>
                <h3 className="font-display text-lg font-semibold sm:text-xl">
                  Reach me directly
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  I usually respond within a day. For anything urgent, a call
                  works best.
                </p>

                <ul className="mt-7 space-y-3">
                  {channels.map(({ label, value, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer noopener"
                        className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon/30 hover:shadow-[0_0_28px_-12px_#00f0ff]"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-neon/25 bg-neon/5 text-neon transition-transform duration-300 group-hover:scale-110">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] tracking-wider text-muted uppercase">
                            {label}
                          </span>
                          <span className="block truncate text-sm text-foreground">
                            {value}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-7 inline-flex items-center gap-2 text-xs text-muted">
                <MapPin className="size-3.5 text-neon" aria-hidden="true" />
                Based in {profile.location} · open to remote
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="glass rounded-3xl p-6 sm:p-8"
              noValidate={false}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" name="name" label="Your Name" required maxLength={80} />
                <Field
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  maxLength={120}
                />
              </div>

              <div className="mt-6">
                <Field
                  id="subject"
                  name="subject"
                  label="Subject (optional)"
                  maxLength={120}
                />
              </div>

              <div className="mt-6">
                <Field
                  id="message"
                  name="message"
                  label="Your Message"
                  textarea
                  required
                  maxLength={2000}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative mt-7 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-neon px-8 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_40px_-6px_#00f0ff] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? (
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {status === "loading" ? "Sending…" : "Send Message"}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              <AnimatePresence>
                {(status === "success" || status === "error") && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    role="status"
                    aria-live="polite"
                    className={`mt-5 inline-flex items-start gap-2 rounded-2xl border px-4 py-3 text-xs ${
                      status === "success"
                        ? "border-neon/30 bg-neon/5 text-neon"
                        : "border-red-400/30 bg-red-400/5 text-red-300"
                    }`}
                  >
                    {status === "success" ? (
                      <CircleCheck
                        className="mt-px size-4 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <CircleAlert
                        className="mt-px size-4 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {message}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
