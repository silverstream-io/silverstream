import { getPosts } from "@/lib/blog";

const SITE_URL = "https://silverstream.io";

// Regenerated hourly so scheduled blog posts are listed on their publish date.
export const revalidate = 3600;

// A plain-language summary of the site for AI assistants and crawlers.
// Format: https://llmstxt.org
export function GET() {
  const posts = getPosts()
    .map(
      (post) =>
        `- [${post.title}](${SITE_URL}/blog/${post.slug})` +
        (post.description ? `: ${post.description}` : ""),
    )
    .join("\n");

  const body = `# Silverstream AI Solutions

> Silverstream AI Solutions is an AI transformation consultancy for small and midsize businesses. We help existing businesses find where their time goes and put AI to work on the repetitive tasks that slow them down, such as inventory, billing, HR, and compliance.

Silverstream works with owners and their teams in four steps:

1. Listen: interview the owner and the people doing the work to find where time and money are slipping away.
2. Map: prioritize improvements by impact and effort.
3. Build: recommend proven existing tools, or build custom AI agents connected to the systems the business already uses.
4. Support: roll out, train the team, and keep tuning as the business changes.

Engagements are scoped and priced to the work each business actually needs. Clients can use their own AI model provider accounts or have Silverstream manage model access for them.

Industries we commonly help include retail, restaurants and bars, real estate, and home services (contractors, HVAC, plumbing, landscaping, and similar trades).

## Pages

- [Home](${SITE_URL}/): Common small business pain points, industries served, how engagements work, and why Silverstream
- [Book a discovery call](${SITE_URL}/contact): Contact form to start a free conversation about what AI could do for a business
- [Blog](${SITE_URL}/blog): Practical notes on putting AI to work in small and midsize businesses
${posts ? `\n## Blog posts\n\n${posts}\n` : ""}`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
