const steps = [
  {
    title: "Listen",
    body: "We start with conversations, with you and with the people doing the work every day, to find where time and money are slipping away.",
  },
  {
    title: "Map",
    body: "Together we pick the improvements worth making first, weighed by impact and effort, so you know exactly what to expect from each one.",
  },
  {
    title: "Build",
    body: "We find the right existing tools or build AI agents tailored to your workflows, connected to the systems you already rely on.",
  },
  {
    title: "Support",
    body: "Rollout, training, and ongoing tuning. Your agents grow with your business, and you always have someone to call.",
  },
];

export default function Process() {
  return (
    <section id="how-it-works" className="scroll-mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                How it works
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Built around your business, not a template
            </h2>
            <p className="text-lg text-indigo-200/65">
              Every business has its own bottlenecks. We take the time to
              understand yours before recommending anything.
            </p>
          </div>
          {/* Steps */}
          <ol className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} data-aos="fade-up" data-aos-delay={index * 100}>
                <span className="mb-3 block bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text font-nacelle text-3xl font-semibold text-transparent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  {step.title}
                </h3>
                <p className="text-indigo-200/65">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
