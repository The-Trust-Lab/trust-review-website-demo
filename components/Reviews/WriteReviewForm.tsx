'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { NewReview } from '@/lib/reviews';

interface WriteReviewFormProps {
  onSubmit: (review: NewReview) => void;
  onCancel: () => void;
}

export default function WriteReviewForm({ onSubmit, onCancel }: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [variantPurchased, setVariantPurchased] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !author.trim() || !email.trim() || !body.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      onSubmit({
        rating,
        author: author.trim(),
        email: email.trim(),
        body: body.trim(),
        variantPurchased: variantPurchased.trim() || undefined
      });
      
      // Reset form
      setRating(0);
      setAuthor('');
      setEmail('');
      setBody('');
      setVariantPurchased('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              Rating *
            </Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-colors p-1"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-slate-600">
                  {rating} star{rating !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Author */}
          <div>
            <Label htmlFor="author" className="text-sm font-medium text-slate-700 mb-2 block">
              Your Name *
            </Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Used for TrustLabs verification badge. Not displayed publicly.
            </p>
          </div>

          {/* Variant */}
          <div>
            <Label htmlFor="variant" className="text-sm font-medium text-slate-700 mb-2 block">
              Variant Purchased (optional)
            </Label>
            <Input
              id="variant"
              value={variantPurchased}
              onChange={(e) => setVariantPurchased(e.target.value)}
              placeholder="e.g., Navy, Large"
            />
          </div>

          {/* Review Body */}
          <div>
            <Label htmlFor="review" className="text-sm font-medium text-slate-700 mb-2 block">
              Your Review *
            </Label>
            <Textarea
              id="review"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts about this product..."
              rows={4}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!rating || !author.trim() || !email.trim() || !body.trim() || isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-slate-500">
            * Required fields. Your review will be posted as unverified and will help other customers make informed decisions.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
