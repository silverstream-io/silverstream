import Image from "next/image";
import HeroImage from "@/public/images/hero-image.webp";

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
            >
              AI-Powered Apps for Support & SaaS
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-xl text-indigo-200/65">
                I design and build custom AI tools that plug into your existing stack—
                from Zendesk and Zoho to custom backends—so your team spends less
                time clicking and more time solving real problems.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 sm:w-auto"
                >
                  Schedule a call
                </a>
              </div>
            </div>
          </div>

          <Image src={HeroImage} alt="AI apps for support and SaaS" width={1920} height={1080} />
        </div>
      </div>
    </section>
  );
}
