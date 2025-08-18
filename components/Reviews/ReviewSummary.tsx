import { Progress } from '@/components/ui/progress';
import RatingStars from '@/components/RatingStars';
import { ReviewSummary as ReviewSummaryType, getReviewPercentage } from '@/lib/reviews';

interface ReviewSummaryProps {
  summary: ReviewSummaryType;
}

export default function ReviewSummary({ summary }: ReviewSummaryProps) {
  const { averageRating, totalReviews, ratingDistribution } = summary;

  if (totalReviews === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="text-center">
        <div className="text-4xl font-bold text-slate-900 mb-2">
          {averageRating.toFixed(1)}
        </div>
        <RatingStars rating={averageRating} size="lg" className="justify-center mb-2" />
        <p className="text-slate-600">
          Based on {totalReviews.toLocaleString()} review{totalReviews !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        <h3 className="font-medium text-slate-900 mb-3">Rating Breakdown</h3>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingDistribution[rating] || 0;
          const percentage = getReviewPercentage(count, totalReviews);
          
          return (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm text-slate-600">{rating}</span>
                <span className="text-sm text-slate-400">★</span>
              </div>
              <div className="flex-1">
                <Progress value={percentage} className="h-2" />
              </div>
              <div className="w-12 text-sm text-slate-600 text-right">
                {count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
