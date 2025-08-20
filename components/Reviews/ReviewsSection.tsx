'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus } from 'lucide-react';
import ReviewSummary from './ReviewSummary';
import ReviewCard from './ReviewCard';
import WriteReviewForm from './WriteReviewForm';
import { 
  Review, 
  ReviewSummary as ReviewSummaryType, 
  NewReview, 
  sortReviews, 
  filterReviews,
  addReview
} from '@/lib/reviews';

interface ReviewsSectionProps {
  productId: string;
  reviews: Review[];
  summary: ReviewSummaryType;
}

export default function ReviewsSection({ productId, reviews: initialReviews, summary: initialSummary }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [summary, setSummary] = useState(initialSummary);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Apply sorting and filtering
  let displayReviews = [...reviews];
  
  if (filterRating !== 'all') {
    displayReviews = filterReviews(displayReviews, { rating: filterRating });
  }
  
  displayReviews = sortReviews(displayReviews, sortBy);

  const handleSubmitReview = useCallback((newReview: NewReview) => {
    const review = addReview(productId, newReview);
    setReviews(prev => [review, ...prev]);
    
    // Update summary (simplified calculation)
    const updatedReviews = [review, ...reviews];
    const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / updatedReviews.length;
    const ratingDistribution = updatedReviews.reduce((dist, r) => {
      dist[r.rating] = (dist[r.rating] || 0) + 1;
      return dist;
    }, {} as { [key: number]: number });

    // Ensure all ratings 1-5 are represented
    for (let i = 1; i <= 5; i++) {
      if (!ratingDistribution[i]) {
        ratingDistribution[i] = 0;
      }
    }

    setSummary({
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: updatedReviews.length,
      ratingDistribution
    });
    
    setShowWriteReview(false);
  }, [productId, reviews]);

  const handleHelpful = useCallback((reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpfulCount: review.helpfulCount + 1 }
        : review
    ));
  }, []);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-slate-600" />
          <h2 className="text-2xl font-bold text-slate-900">
            Customer Reviews
          </h2>
        </div>
        <Button
          onClick={() => setShowWriteReview(true)}
          className="bg-indigo-600 hover:bg-indigo-700 gap-2"
          disabled={showWriteReview}
        >
          <Plus className="h-4 w-4" />
          Write Review
        </Button>
      </div>

      {/* Review Summary */}
      <Card>
        <CardContent className="p-6">
          <ReviewSummary summary={summary} />
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <WriteReviewForm
          onSubmit={handleSubmitReview}
          onCancel={() => setShowWriteReview(false)}
        />
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg">
                Reviews ({reviews.length})
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Filter by Rating */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 whitespace-nowrap">Filter:</label>
                  <Select value={filterRating.toString()} onValueChange={(value) => 
                    setFilterRating(value === 'all' ? 'all' : parseInt(value))
                  }>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 whitespace-nowrap">Sort:</label>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="highest">Highest Rating</SelectItem>
                      <SelectItem value="lowest">Lowest Rating</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {filterRating !== 'all' && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  Showing {filterRating}-star reviews ({displayReviews.length})
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterRating('all')}
                  className="text-slate-500"
                >
                  Clear filter
                </Button>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            {displayReviews.length > 0 ? (
              <div className="space-y-6">
                {displayReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onHelpful={handleHelpful}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600">
                  No reviews match the current filter.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setFilterRating('all')}
                  className="mt-2"
                >
                  Show all reviews
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
