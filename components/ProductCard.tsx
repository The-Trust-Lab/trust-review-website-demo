// Removed unused import: Image
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import RatingStars from './RatingStars';
import { Product } from '@/lib/products';
import { getReviewSummary } from '@/lib/reviews';
import { formatPrice } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const reviewSummary = getReviewSummary(product.id);
  
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          {/* Product image */}
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <div className="w-16 h-16 mx-auto mb-2 bg-slate-300 rounded-lg flex items-center justify-center">
                  <span className="text-slate-500 font-semibold text-lg">
                    {product.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <p className="text-xs">Product Image</p>
              </div>
            </div>
          )}
          
          {/* Featured badge */}
          {product.featured && (
            <Badge 
              className="absolute top-3 left-3 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Featured
            </Badge>
          )}
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="secondary" className="bg-white text-slate-900">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          {/* Category */}
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          
          {/* Product name */}
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          {reviewSummary.totalReviews > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <RatingStars 
                rating={reviewSummary.averageRating} 
                size="sm"
                showRating
              />
              <span className="text-xs text-slate-500">
                ({reviewSummary.totalReviews})
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="font-bold text-slate-900 text-lg">
              {formatPrice(product.price)}
            </p>
            
            {/* Color indicators */}
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 3 && (
                <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="text-xs text-slate-600 font-medium">
                    +{product.colors.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Description preview */}
          <p className="text-sm text-slate-600 mt-2 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
