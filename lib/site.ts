import type { Metadata } from "next";

export const SITE_URL = "https://silverstream.io";
export const SITE_NAME = "Silverstream AI Solutions";
export const SITE_DESCRIPTION =
  "Silverstream AI Solutions helps small and midsize businesses put AI to work on inventory, billing, HR, compliance, and the other tasks that eat up their week.";

// Served by app/opengraph-image.tsx. Listed explicitly because a page's own
// openGraph metadata replaces the one Next.js would otherwise add.
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: practical AI for small and midsize businesses`,
};

// Title, description, canonical URL, and social sharing tags for one page.
export function pageMetadata({
  title,
  description,
  path,
  canonical,
  openGraph,
}: {
  title: string;
  description: string;
  path: string;
  canonical?: string;
  openGraph?: Metadata["openGraph"];
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonical ?? path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [SHARE_IMAGE],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

// Serializes structured data for a <script type="application/ld+json"> tag.
// Escaping "<" keeps post content from closing the script tag early.
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

// What Silverstream offers and how it's priced. Shared by the pricing page,
// structured data, llms.txt, and the in-page agent tools.
export const SERVICES = [
  "AI readiness interviews and workflow assessment",
  "Custom AI agent development",
  "AI tool selection and integration",
  "AI rollout, training, and ongoing support",
];

export const PROCESS = [
  "Listen: interview the owner and the people doing the work to find where time and money are slipping away.",
  "Map: prioritize improvements by impact and effort.",
  "Build: recommend proven existing tools, or build custom AI agents connected to the systems the business already uses.",
  "Support: roll out, train the team, and keep tuning as the business changes.",
];

export const INDUSTRIES = [
  "Retail",
  "Restaurants and bars",
  "Real estate",
  "Home services",
];

export const PRICING = [
  {
    name: "Discovery call",
    price: "Free",
    description:
      "A conversation about where your team's time goes and what's worth improving first. No obligation.",
    // Machine-readable price for structured data; omitted when quoted per engagement
    amount: "0",
  },
  {
    name: "AI transformation engagement",
    price: "Custom quote",
    description:
      "Scoped to your specific use cases after the discovery call, so a small fix is priced like a small fix. You'll know the cost before any work begins.",
  },
  {
    name: "AI model usage",
    price: "Your keys or ours",
    description:
      "Use your own AI provider accounts and pay the provider directly, or have us manage model access and bill usage alongside your engagement.",
  },
];

export function pricingOffers() {
  return PRICING.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.description,
    ...(plan.amount !== undefined
      ? { price: plan.amount, priceCurrency: "USD" }
      : {}),
    url: `${SITE_URL}/pricing`,
    seller: { "@id": `${SITE_URL}/#organization` },
  }));
}
