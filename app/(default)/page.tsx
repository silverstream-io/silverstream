export const metadata = {
  title: "Silverstream - AI Transformation for Small Business",
  description:
    "Find where your team's time goes and put AI to work getting it back. Custom AI agents for inventory, billing, HR, and compliance.",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Process from "@/components/process";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Process />
      <Features />
      <Testimonials />
      <Cta />
    </>
  );
}
