import { NextResponse } from "next/server";
import { profile } from "@/app/data/profile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Where contact-form submissions are delivered. */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? profile.email;

/* ------------------------------------------------------------------
   Rate limiting

   In-memory and therefore per-instance: a serverless platform can run
   several instances, so this is a spam speed bump, not a hard guarantee.
   Good enough for a portfolio contact form.
------------------------------------------------------------------ */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

type Message = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function buildBody({ name, email, subject, message }: Message) {
  const text = [
    `New message from your portfolio contact form.`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${subject}`,
    ``,
    message,
  ].join("\n");

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${escape(name)}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Subject</td><td>${escape(subject)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;padding:16px;background:#f6f8fa;border-radius:8px">${escape(message)}</div>
    </div>`;

  return { text, html };
}

/** Resend (https://resend.com) — preferred: proper reply-to and deliverability. */
async function sendViaResend(msg: Message, apiKey: string) {
  const { text, html } = buildBody(msg);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
      to: [TO_EMAIL],
      reply_to: msg.email,
      subject: `[Portfolio] ${msg.subject}`,
      text,
      html,
    }),
  });

  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/** Web3Forms (https://web3forms.com) — no account needed, just an access key. */
async function sendViaWeb3Forms(msg: Message, accessKey: string) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: msg.name,
      replyto: msg.email,
      subject: `[Portfolio] ${msg.subject}`,
      name: msg.name,
      email: msg.email,
      message: msg.message,
    }),
  });

  const json = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !json.success) {
    throw new Error(`Web3Forms ${res.status}: ${json.message ?? "unknown error"}`);
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages just now. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real people never fill a hidden field, bots usually do.
  if (String(body.company ?? "").trim() !== "") {
    return NextResponse.json({ message: "Thanks for reaching out!" });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim() || "New portfolio message";
  const message = String(body.message ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Your message needs to be at least 10 characters." },
      { status: 422 },
    );
  }

  const msg: Message = { name, email, subject, message };
  const resendKey = process.env.RESEND_API_KEY;
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

  try {
    if (resendKey) {
      await sendViaResend(msg, resendKey);
    } else if (web3formsKey) {
      await sendViaWeb3Forms(msg, web3formsKey);
    } else if (process.env.NODE_ENV === "production") {
      // Never pretend a message was delivered when nothing is configured.
      console.error(
        "[contact] no mail provider configured — set RESEND_API_KEY or WEB3FORMS_ACCESS_KEY",
      );
      return NextResponse.json(
        {
          error: `Messaging is offline right now. Please email me directly at ${TO_EMAIL}.`,
        },
        { status: 503 },
      );
    } else {
      console.info("[contact] dev mode, message not sent:", msg);
    }
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { error: `Could not send right now. Please email me at ${TO_EMAIL}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thanks for reaching out! I'll get back to you shortly.",
  });
}
