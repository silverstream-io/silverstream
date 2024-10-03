import Image from "next/image";
import HeroImage from "@/public/images/hero-image.webp";

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Customer Support with AI
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
              Streamline and enhance your customer support experience with our innovative AI-integrated applications.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                  <h2 className="h4 mb-4">Trusted by support teams worldwide</h2>
                  <p className="text-xl text-gray-600">
                    Our AI-powered Zendesk apps are enhancing customer support experiences for businesses of all sizes.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>

          <Image src={HeroImage} alt="Hero Image" width={1920} height={1080} />
        </div>
      </div>
    </section>
  );
}
