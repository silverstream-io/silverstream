import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Silverstream',
  description: 'Get in touch with Silverstream to supercharge your customer support with AI',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}