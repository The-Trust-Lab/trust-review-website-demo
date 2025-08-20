import { ThumbsUp, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RatingStars from '@/components/RatingStars';
import TrustLabsBadge from '@/components/TrustLabsBadge';
import { Review, formatReviewDate } from '@/lib/reviews';
import { memo } from 'react';

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
}

function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  return (
    <div className="border-b border-slate-200 pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <RatingStars rating={review.rating} size="sm" />
            <span className="text-sm text-slate-600">
              {formatReviewDate(review.date)}
            </span>
          </div>
        </div>
        
        {review.isVerified && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Verified Purchase
          </Badge>
        )}
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-slate-900">
            {review.author}
          </h4>
          <TrustLabsBadge email={review.email} size="sm" />
        </div>
        {review.variantPurchased && (
          <p className="text-sm text-slate-600">
            Purchased: {review.variantPurchased}
          </p>
        )}
      </div>

      <div className="mb-4">
        <p className="text-slate-700 leading-relaxed">
          {review.body}
        </p>
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center"
            >
              <span className="text-xs text-slate-400">IMG</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onHelpful?.(review.id)}
          className="text-slate-600 hover:text-slate-800 gap-2"
        >
          <ThumbsUp className="h-4 w-4" />
          Helpful ({review.helpfulCount})
        </Button>
        
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>Review #{review.id}</span>
        </div>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ReviewCard);
