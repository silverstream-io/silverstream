# Silverstream

Marketing site and lightweight backend for Silverstream—a consulting practice that designs and builds custom AI tools for customer support teams and SaaS companies.

## What Silverstream does

Silverstream helps support and product teams reduce manual work by integrating AI into the tools they already use. Engagements typically focus on:

- **Custom AI agents** — Purpose-built assistants tuned to your products, policies, and tone of voice.
- **AI-powered ticket resolution** — Smarter triage, suggested replies, and automation inside your helpdesk.
- **Reporting and insights** — Dashboards and metrics around agent performance, resolution times, and automation impact.
- **Stack integrations** — Zendesk, Zoho, and custom backends; tools are built to fit your existing workflow rather than replace it.

The public site presents these capabilities on the home page and routes interested visitors to a contact form to start a conversation.

## About this repository

This repo is the source for the Silverstream marketing website. It is **not** a SaaS product or app marketplace—it is the brochure, lead capture, and deployment shell for the consulting practice.

| Area | Purpose |
|------|---------|
| `app/(default)/` | Home page (hero, workflows, features, CTA) and `/contact` |
| `app/api/contact/` | POST handler that emails contact form submissions via SMTP |
| `app/(auth)/` | Sign-in/sign-up pages (present in the codebase; header links are currently disabled) |
| `app/guild-bridge/` | Next.js route adapter for the `guild-bridge/` service (IMAP + SMS API used by internal automation) |
| `components/` | Page sections and shared UI (header, footer, etc.) |
| `guild-bridge/` | Standalone bridge service; see `guild-bridge/VERCEL.md` for deployment |

The site is built with **Next.js 14** (App Router), **React 18**, **TypeScript**, and **Tailwind CSS**. It started from the [Open Pro](https://cruip.com/) template and has been customized for Silverstream’s positioning and copy.

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install and run locally

```bash
git clone https://github.com/silverstream-io/silverstream.git
cd silverstream
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The contact form requires SMTP environment variables to send mail (see below).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Configuration

Contact form delivery uses [Nodemailer](https://nodemailer.com/). Set these in `.env.local` (or your host’s environment):

| Variable | Description |
|----------|-------------|
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port (default `587`) |
| `EMAIL_SECURE` | `true` for TLS on port 465 |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password |
| `EMAIL_FROM` | Sender address |
| `EMAIL_TO` | Inbox that receives form submissions |

Without these, the site still runs; submissions to `/api/contact` will fail until mail is configured.

## Deployment

The marketing site is a standard Next.js application and deploys cleanly to [Vercel](https://vercel.com) or any Node host that supports `next build` / `next start`.

The `guild-bridge` service can be deployed separately or mounted under `/guild-bridge` on the same project; see `guild-bridge/VERCEL.md` for IMAP, Twilio, and API key setup.

## License

Private repository. All rights reserved unless otherwise noted.
