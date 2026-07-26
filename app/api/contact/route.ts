import { NextResponse } from "next/server";
import { profile } from "@/app/data/profile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact endpoint.
 *
 * Out of the box this validates the payload and logs it server-side, so the
 * form works with zero configuration. Set RESEND_API_KEY (and optionally
 * CONTACT_FROM_EMAIL) in your environment and the message is also delivered
 * to `profile.email` via Resend's REST API — no extra dependency required.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim() || "New portfolio message";
  const message = String(body.message ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 422 },
    );
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

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [profile.email],
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error("[contact] delivery failed:", err);
      return NextResponse.json(
        { error: "Could not send right now — please email me directly." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] message received:", { name, email, subject, message });
  }

  return NextResponse.json({
    message: "Thanks for reaching out — I'll get back to you shortly.",
  });
}
