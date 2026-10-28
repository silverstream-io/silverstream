import Link from "next/link";

const painPoints = [
  {
    area: "Inventory",
    pain: "Counts that never quite match. Reorders placed too late, or twice.",
    fix: "Forecast demand, flag discrepancies, and draft purchase orders before you run out.",
  },
  {
    area: "Billing",
    pain: "Invoices sent late, payments chased by hand, reconciliation at midnight.",
    fix: "Generate invoices, follow up on overdue accounts, and match payments automatically.",
  },
  {
    area: "HR",
    pain: "Onboarding checklists, PTO requests, and the same policy questions every week.",
    fix: "Answer policy questions instantly, route requests, and keep employee records current.",
  },
  {
    area: "Compliance",
    pain: "Rules change, deadlines move, and the paperwork is always a step behind.",
    fix: "Track requirements, prepare documentation, and keep an audit trail you can actually find.",
  },
];

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-16">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50 max-sm:before:hidden max-sm:after:hidden">
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                <span className="font-semibold">Silverstream AI Solutions</span>
                <span className="max-sm:hidden"> · </span>
                <br className="sm:hidden" />
                AI transformation for small and midsize businesses
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold leading-tight text-transparent md:text-5xl md:leading-tight">
              Your team is buried in work
              <br className="max-md:hidden" /> a machine could be doing.
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-xl text-indigo-200/65">
                Inventory, billing, HR, compliance. Every small business
                wrestles with the same handful of time sinks, and every one of
                them can be improved with the right AI. Silverstream AI
                Solutions helps you find where the hours go and puts AI to work
                on getting them back.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <Link
                  href="/contact"
                  className="btn group mb-4 w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                >
                  <span className="relative inline-flex items-center">
                    Book a discovery call
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </Link>
                <a
                  href="#how-it-works"
                  className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                >
                  See how it works
                </a>
              </div>
            </div>
          </div>

          {/* Pain points */}
          <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item, index) => (
              <article
                key={item.area}
                className="relative flex flex-col rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h2 className="mb-2 font-nacelle text-lg font-semibold text-gray-200">
                  {item.area}
                </h2>
                <p className="mb-4 text-indigo-200/65">{item.pain}</p>
                <div className="mt-auto border-t border-gray-800 pt-4">
                  <span className="mb-1 block bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-xs font-medium uppercase tracking-wider text-transparent">
                    With the right AI
                  </span>
                  <p className="text-sm text-gray-300">{item.fix}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
