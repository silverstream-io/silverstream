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
