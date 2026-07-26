# Kchitiz Shukla — Developer Portfolio

A futuristic, single-page developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**. Dark-only theme: deep black canvas, neon-blue accents, glassmorphism panels and an animated particle/grid background.

## Features

- **Hero** — animated typing effect, particle field with cursor linking, profile portrait, resume download and stat strip
- **About** — professional summary, capability pillars, key achievements, education
- **Skills** — tabbed categories (Frontend / Backend & Databases / Mobile / AI, Cloud & Tools) with animated proficiency bars and an infinite tech ticker
- **Projects** — 3D tilt cards with per-project accent glow, tech stacks and repo links
- **Experience** — neon timeline with role, duration, impact bullets and stack chips
- **Contact** — validated form backed by an API route, plus direct email / phone / social links
- Sticky blurred navbar with scroll-progress bar and section-aware `#hash` highlighting
- Cursor glow trail, preloader, smooth scrolling, SEO metadata, JSON-LD, sitemap and robots
- Fully responsive (mobile → desktop), accessible (ARIA labels, focus rings, `prefers-reduced-motion` support)

## Tech Stack

| Layer     | Choice                             |
| --------- | ---------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language  | TypeScript                         |
| Styling   | Tailwind CSS v4                    |
| Animation | Framer Motion                      |
| Icons     | Lucide React + React Icons         |
| Fonts     | Inter (body) + Orbitron (display)  |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build
npm run start
npm run lint
```

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable               | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for SEO metadata, `sitemap.xml` and `robots.txt`.        |
| `CONTACT_TO_EMAIL`     | Inbox that receives contact-form messages. Defaults to `profile.email`.     |
| `WEB3FORMS_ACCESS_KEY` | Provider option A. No account needed; the key is emailed to you.           |
| `RESEND_API_KEY`       | Provider option B. Better deliverability, free tier.                       |
| `CONTACT_FROM_EMAIL`   | Sender address for Resend. Defaults to `onboarding@resend.dev`.             |

### Making the contact form deliver mail

The endpoint validates, rate-limits (5 messages per IP per 10 minutes) and filters bots via a honeypot field on its own. Delivery needs one provider key:

**Option A — Web3Forms (fastest, no signup):** go to [web3forms.com](https://web3forms.com), enter your inbox address, and the access key arrives by email. Set it as `WEB3FORMS_ACCESS_KEY`.

**Option B — Resend:** create an account at [resend.com](https://resend.com), make an API key, set it as `RESEND_API_KEY`. Without a verified domain, `onboarding@resend.dev` can only deliver to the address your Resend account uses, which is fine when that is your own inbox.

Set the variable locally in `.env.local`, and on Vercel under **Project → Settings → Environment Variables** (then redeploy).

With no provider configured, the form logs submissions in development and returns an honest "messaging is offline, email me directly" error in production, rather than pretending a message was delivered.

## Project Structure

```
app/
  api/contact/route.ts   # contact endpoint (validation, rate limit, honeypot, mail delivery)
  components/            # Navbar, Footer, Preloader, CursorGlow, ParticleField, Reveal, …
  sections/              # Hero, About, Skills, Projects, Experience, Contact
  data/profile.ts        # single source of truth for all content
  globals.css            # design tokens, utilities, keyframes
  layout.tsx             # fonts, SEO metadata, JSON-LD, chrome
  page.tsx               # section composition
public/
  images/kchitiz-shukla-portrait.jpeg   # portrait
  Kchitiz-Shukla-Resume.pdf
```

## Editing Content

All copy — bio, skills, projects, experience, education, links — lives in [`app/data/profile.ts`](app/data/profile.ts). Change it there and every section updates.

To swap the portrait, replace `public/images/kchitiz-shukla-portrait.jpeg` (and give it a new filename if browsers cache the old one). To swap the resume, replace `public/Kchitiz-Shukla-Resume.pdf` (or update `profile.resume`).

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the defaults are correct for Next.js.
3. Add `NEXT_PUBLIC_SITE_URL` (and the Resend variables if you want live email) in **Project → Settings → Environment Variables**.
4. Deploy.

## License

Personal portfolio — content and imagery © Kchitiz Shukla. Code is free to reference.
