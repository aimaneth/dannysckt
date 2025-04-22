import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Danny\'s CKT',
  description: 'Explore our authentic Char Kway Teow products. Premium ingredients and sauces for your business.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 