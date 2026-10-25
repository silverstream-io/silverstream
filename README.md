# Silverstream AI Solutions

Marketing site and contact form for Silverstream AI Solutions, an AI transformation consultancy for small and midsize businesses.

## What Silverstream does

Silverstream helps existing SMBs put AI to work on the everyday tasks that eat up their week: inventory, billing, HR, compliance, and whatever else is slowing the team down. Engagements follow four steps:

- **Listen**: Interview the owner and the people doing the work to find where time and money are leaking.
- **Map**: Prioritize improvements by impact and effort.
- **Build**: Recommend existing tools or build custom AI agents connected to the client's current systems.
- **Support**: Roll out, train, and tune as the business changes.

Pricing is scoped per engagement. Clients can bring their own model provider keys or use Silverstream-managed access.

## About this repository

This repo is the source for the Silverstream marketing website. It is **not** a SaaS product or app marketplace—it is the brochure, lead capture, and deployment shell for the consulting practice.

| Area | Purpose |
|------|---------|
| `app/(default)/` | Home page (hero with pain points, industries, process, features, testimonials, CTA) and `/contact` |
| `app/api/contact/` | POST handler that emails contact form submissions via SMTP |
| `app/(auth)/` | Sign-in/sign-up pages (present in the codebase; header links are currently disabled) |
| `app/(default)/blog/` | Blog index and post pages |
| `content/blog/` | Blog posts as Markdown files |
| `components/` | Page sections and shared UI (header, footer, etc.) |

The site is built with **Next.js 14** (App Router), **React 18**, **TypeScript**, and **Tailwind CSS**. It started from the [Open Pro](https://cruip.com/) template and has been customized for Silverstream’s positioning and copy.

Client testimonials live in the `testimonials` array in `components/testimonials.tsx`. The section stays hidden while the array is empty and rotates automatically once it holds two or more quotes.

## Writing blog posts

Posts are Markdown files in `content/blog/`. To add one, copy `content/blog/_template.md` to a new file such as `content/blog/my-first-post.md` (the file name becomes the URL, `/blog/my-first-post`), fill in the front matter, and write the post below it.

- `title` and `date` (`YYYY-MM-DD`) are required. `description`, `author`, and `canonical` are optional. Set `canonical` to the original URL when reposting something first published elsewhere, so search engines credit the original.
- `draft: true` shows the post in `npm run dev` only. Remove it or set it to `false` to publish.
- Posts dated in the future are scheduled: they're hidden on the live site until midnight Pacific on their `date`, then appear within the hour without a redeploy. They show in `npm run dev` with a Scheduled badge. The time zone is set in `lib/blog.ts`.
- Files starting with `_` are ignored.

The Blog link in the header and footer appears automatically once at least one post is published.

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

## License

Private repository. All rights reserved unless otherwise noted.
