import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Book a Discovery Call - Silverstream AI Solutions",
  description:
    "Tell us what is slowing your business down and we will explore what AI can do about it.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}