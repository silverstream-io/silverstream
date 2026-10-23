const industries = [
  {
    name: "Retail",
    examples: [
      "Stock forecasting and reorder alerts",
      "Product descriptions and listings",
      "Customer questions answered around the clock",
    ],
  },
  {
    name: "Restaurants & bars",
    examples: [
      "Food and liquor cost tracking",
      "Staff scheduling and shift swaps",
      "Reservations, reviews, and catering inquiries",
    ],
  },
  {
    name: "Real estate",
    examples: [
      "Lead follow-up and appointment setting",
      "Listing copy and market summaries",
      "Transaction paperwork and deadline tracking",
    ],
  },
  {
    name: "Home services",
    examples: [
      "Quotes and invoices sent from the job site",
      "Dispatching and scheduling crews",
      "Permits, licenses, and insurance renewals",
    ],
  },
];

export default function Industries() {
  return (
    <section id="industries" className="scroll-mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Who we help
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Built for Main Street businesses
            </h2>
            <p className="text-lg text-indigo-200/65">
              Every industry has its own busywork. Here are a few places we
              see AI paying off quickly. Don't see yours? Let's talk anyway.
            </p>
          </div>
          {/* Industries */}
          <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <article
                key={industry.name}
                className="relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">
                  {industry.name}
                </h3>
                <ul className="space-y-2 text-sm text-indigo-200/65">
                  {industry.examples.map((example) => (
                    <li key={example} className="flex gap-2">
                      <span className="text-indigo-500" aria-hidden="true">
                        ·
                      </span>
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
