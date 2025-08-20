import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { memo } from 'react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  className?: string;
}

function RatingStars({ 
  rating, 
  maxStars = 5, 
  size = 'md',
  showRating = false,
  className 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  };

  const stars = [];
  
  for (let i = 1; i <= maxStars; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalfFilled = i === Math.ceil(rating) && rating % 1 !== 0;
    
    stars.push(
      <div key={i} className="relative">
        <Star
          className={cn(
            sizeClasses[size],
            'text-slate-300'
          )}
        />
        {(isFilled || isHalfFilled) && (
          <Star
            className={cn(
              sizeClasses[size],
              'absolute inset-0 text-yellow-400 fill-current',
              isHalfFilled && 'w-1/2 overflow-hidden'
            )}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showRating && (
        <span className={cn('text-slate-600 ml-1', textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(RatingStars);
