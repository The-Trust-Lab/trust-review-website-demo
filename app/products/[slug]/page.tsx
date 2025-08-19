import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/products';
import { getProductReviews, getReviewSummary } from '@/lib/reviews';
import ProductDetailClient from './ProductDetailClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Static generation disabled for demo purposes

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found - Thread Lab',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} - Thread Lab`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Thread Lab`,
      description: product.description,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const reviews = getProductReviews(product.id);
  const reviewSummary = getReviewSummary(product.id);

  return (
    <ProductDetailClient 
      product={product} 
      reviews={reviews} 
      reviewSummary={reviewSummary} 
    />
  );
}
