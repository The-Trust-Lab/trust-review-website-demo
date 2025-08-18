import reviewsData from '@/data/reviews.json';

export interface Review {
  id: string;
  productId: string;
  rating: number;
  author: string;
  date: string;
  body: string;
  isVerified: boolean;
  variantPurchased: string;
  helpfulCount: number;
  images: string[];
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
}

export interface NewReview {
  rating: number;
  author: string;
  body: string;
  variantPurchased?: string;
}

export function getAllReviews(): Review[] {
  return reviewsData as Review[];
}

export function getProductReviews(productId: string): Review[] {
  return reviewsData.filter(review => review.productId === productId) as Review[];
}

export function getReviewSummary(productId: string): ReviewSummary {
  const reviews = getProductReviews(productId);
  
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  const ratingDistribution = reviews.reduce((dist, review) => {
    dist[review.rating] = (dist[review.rating] || 0) + 1;
    return dist;
  }, {} as { [key: number]: number });

  // Ensure all ratings 1-5 are represented
  for (let i = 1; i <= 5; i++) {
    if (!ratingDistribution[i]) {
      ratingDistribution[i] = 0;
    }
  }

  return {
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    totalReviews: reviews.length,
    ratingDistribution
  };
}

export function sortReviews(
  reviews: Review[], 
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'
): Review[] {
  const sorted = [...reviews];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case 'highest':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'helpful':
      return sorted.sort((a, b) => b.helpfulCount - a.helpfulCount);
    default:
      return sorted;
  }
}

export function filterReviews(reviews: Review[], filters: {
  rating?: number;
  verified?: boolean;
}): Review[] {
  let filtered = [...reviews];

  if (filters.rating) {
    filtered = filtered.filter(review => review.rating === filters.rating);
  }

  if (filters.verified !== undefined) {
    filtered = filtered.filter(review => review.isVerified === filters.verified);
  }

  return filtered;
}

export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function addReview(productId: string, newReview: NewReview): Review {
  const review: Review = {
    id: `r${Date.now()}`, // Simple ID generation for demo
    productId,
    rating: newReview.rating,
    author: newReview.author,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    body: newReview.body,
    isVerified: false, // New reviews start as unverified
    variantPurchased: newReview.variantPurchased || '',
    helpfulCount: 0,
    images: []
  };

  // In a real app, this would persist to a database
  // For demo purposes, we'll just return the review object
  return review;
}

export function getReviewPercentage(rating: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((rating / total) * 100);
}

// Helper function to generate star rating display
export function getStarRating(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return { full, half, empty };
}
