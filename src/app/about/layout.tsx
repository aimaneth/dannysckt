import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Danny\'s CKT',
  description: 'Learn about Danny\'s Char Kuey Teow, our story, and our commitment to authentic Malaysian street food.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 