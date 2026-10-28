import Link from "next/link";
import { PRICING, SITE_URL, jsonLd, pageMetadata, pricingOffers } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pricing - Silverstream AI Solutions",
  description:
    "Start with a free discovery call. AI transformation engagements are quoted to fit your use cases, and you can use your own AI model keys or ours.",
  path: "/pricing",
});

const offerCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Silverstream AI Solutions pricing",
  url: `${SITE_URL}/pricing`,
  itemListElement: pricingOffers(),
};

export default function Pricing() {
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(offerCatalog)}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Pricing that fits the work
            </h1>
            <p className="text-lg text-indigo-200/65">
              Every business is different, so we don't sell packages. We start
              by understanding what's slowing you down, then quote the work
              that will actually help.
            </p>
          </div>

          {/* Plans */}
          <div className="mx-auto grid max-w-sm gap-6 lg:max-w-none lg:grid-cols-3">
            {PRICING.map((plan) => (
              <article
                key={plan.name}
                className="relative flex flex-col rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <h2 className="mb-1 font-nacelle text-lg font-semibold text-gray-200">
                  {plan.name}
                </h2>
                <p className="mb-4 bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text font-nacelle text-2xl font-semibold text-transparent">
                  {plan.price}
                </p>
                <p className="text-indigo-200/65">{plan.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="btn group bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
            >
              <span className="relative inline-flex items-center">
                Book a free discovery call
                <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
