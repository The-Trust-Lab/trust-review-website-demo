'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
// Removed unused imports: Card, CardContent
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Heart, Share, Minus, Plus, Truck, RefreshCw, Shield } from 'lucide-react';
import Container from '@/components/Container';
import RatingStars from '@/components/RatingStars';
import ReviewsSection from '@/components/Reviews/ReviewsSection';
import { Product } from '@/lib/products';
import { Review, ReviewSummary } from '@/lib/reviews';
import { formatPrice } from '@/lib/cart';
import { useCart } from '@/lib/cart-context';

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
  reviewSummary: ReviewSummary;
}

export default function ProductDetailClient({ product, reviews, reviewSummary }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return;
    }

    addToCart(product, { color: selectedColor, size: selectedSize }, quantity);
  };

  const canAddToCart = product.inStock && selectedColor && selectedSize;

  return (
    <div className="py-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
              {/* Main product image */}
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <div className="w-24 h-24 mx-auto mb-4 bg-slate-300 rounded-2xl flex items-center justify-center">
                      <span className="text-slate-500 font-bold text-2xl">
                        {product.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <p className="text-lg">No Image Available</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Image thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`
                      aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 transition-colors
                      ${currentImageIndex === index 
                        ? 'border-indigo-500' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              {reviewSummary.totalReviews > 0 && (
                <div className="flex items-center gap-4 mb-4">
                  <RatingStars 
                    rating={reviewSummary.averageRating} 
                    showRating 
                    className="gap-1"
                  />
                  <span className="text-slate-600">
                    ({reviewSummary.totalReviews} review{reviewSummary.totalReviews !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

              <div className="text-3xl font-bold text-slate-900">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-700 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium text-slate-900 mb-3">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`
                      w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all
                      ${selectedColor === color.name 
                        ? 'border-indigo-500 ring-2 ring-indigo-200' 
                        : 'border-slate-300 hover:border-slate-400'
                      }
                    `}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium text-slate-900 mb-3">
                Size: <span className="font-normal">{selectedSize}</span>
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-slate-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <div>
              {product.inStock ? (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2 py-6 text-lg"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-slate-700">Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-slate-700">30-day returns and exchanges</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-slate-700">Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="mb-16">
          <Accordion type="single" collapsible defaultValue="details" className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-left">
                <span className="text-lg font-semibold">Product Details</span>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-3">Material & Care</h3>
                    <div className="space-y-2 text-slate-700">
                      <p><strong>Material:</strong> {product.details.material}</p>
                      <p><strong>Fit:</strong> {product.details.fit}</p>
                      <p><strong>Care Instructions:</strong> {product.details.care}</p>
                      <p><strong>Origin:</strong> {product.details.origin}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-3">Available Options</h3>
                    <div className="space-y-2 text-slate-700">
                      <p><strong>Colors:</strong> {product.colors.map(c => c.name).join(', ')}</p>
                      <p><strong>Sizes:</strong> {product.sizes.join(', ')}</p>
                      <p><strong>Category:</strong> {product.category}</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-left">
                <span className="text-lg font-semibold">Shipping & Returns</span>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="space-y-4 text-slate-700">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Shipping Information</h3>
                    <ul className="space-y-1">
                      <li>• Free standard shipping on orders over $75</li>
                      <li>• Standard shipping (3-7 business days): $9.99</li>
                      <li>• Express shipping (1-3 business days): $19.99</li>
                      <li>• Orders placed before 2 PM EST ship the same day</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Return Policy</h3>
                    <ul className="space-y-1">
                      <li>• 30-day return window for all items</li>
                      <li>• Items must be in original condition with tags</li>
                      <li>• Free returns with prepaid shipping label</li>
                      <li>• Refunds processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator className="my-16" />

        {/* Reviews Section */}
        <ReviewsSection 
          productId={product.id}
          reviews={reviews}
          summary={reviewSummary}
        />
      </Container>
    </div>
  );
}
