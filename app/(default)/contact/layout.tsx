import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Discovery Call - Silverstream',
  description: 'Tell us what is slowing your business down and we will explore what AI can do about it.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}