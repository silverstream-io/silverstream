import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Header from "@/components/ui/header";
import AgentTools from "@/components/agent-tools";
import { getPosts } from "@/lib/blog";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SERVICES,
  jsonLd,
  pricingOffers,
} from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

// Re-render pages hourly so scheduled blog posts (and the header/footer Blog
// link) appear on their publish date without a new deploy.
export const revalidate = 3600;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} - AI Transformation for Small Business`,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
};

// Describes the business to search engines and AI assistants. Kept as
// separate top-level blocks so simple parsers can read each one.
const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Silverstream",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-white.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  founder: { "@type": "Person", name: "Cory Waddingham" },
  knowsAbout: [
    "AI transformation",
    "AI agents",
    "Business process automation",
    "Small business operations",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI transformation services",
    itemListElement: SERVICES.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
  makesOffer: pricingOffers(),
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organization)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(website)}
        />
        <AgentTools
          posts={getPosts().map(({ slug, title, description, date }) => ({
            slug,
            title,
            description,
            date,
          }))}
        />
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
