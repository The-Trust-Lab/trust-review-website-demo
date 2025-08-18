import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Truck } from 'lucide-react';
import { Cart, calculateOrderTotal, formatPrice } from '@/lib/cart';

interface CartSummaryProps {
  cart: Cart;
  showActions?: boolean;
}

export default function CartSummary({ cart, showActions = true }: CartSummaryProps) {
  const orderTotal = calculateOrderTotal(cart.total);
  const freeShippingThreshold = 75;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cart.total);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Free Shipping Progress */}
        {remainingForFreeShipping > 0 ? (
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">
                Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for free shipping
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, (cart.total / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-700">
              <Truck className="h-4 w-4" />
              <span className="text-sm font-medium">
                You qualify for free shipping! 🎉
              </span>
            </div>
          </div>
        )}

        {/* Order Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal ({cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''})</span>
            <span>{formatPrice(orderTotal.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span>
              {orderTotal.shipping === 0 ? (
                <span className="text-emerald-600 font-medium">Free</span>
              ) : (
                formatPrice(orderTotal.shipping)
              )}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>{formatPrice(orderTotal.tax)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between text-lg font-bold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(orderTotal.total)}</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="space-y-3 pt-4">
            <Button 
              asChild 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={cart.itemCount === 0}
            >
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        )}

        {/* Additional Info */}
        <div className="pt-4 border-t text-xs text-slate-500 space-y-1">
          <p>• Secure checkout with SSL encryption</p>
          <p>• 30-day return policy on all items</p>
          <p>• Customer service: 1-800-THREAD-LAB</p>
        </div>
      </CardContent>
    </Card>
  );
}
