'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, ArrowLeft, Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/Container';
import CartItemComponent from '@/components/Cart/CartItem';
import CartSummary from '@/components/Cart/CartSummary';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your cart...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (cart.itemCount === 0) {
    return (
      <div className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Your cart is empty
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                              Looks like you haven&apos;t added any items to your cart yet. 
              Let&apos;s find some great products for you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link href="/products">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Start Shopping
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/">
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/products" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-slate-600 mt-2">
            {cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Items in Your Cart</CardTitle>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-slate-500 hover:text-red-600 gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {cart.items.map((item) => (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  You might also like
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center py-8">
                  Check out our featured products and customer favorites.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24">
              <CartSummary cart={cart} />
            </div>
          </div>
        </div>

        {/* Security & Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-slate-900">Secure Checkout</h3>
                <p className="text-sm text-slate-600">SSL encrypted payments</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">↩</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-slate-900">Easy Returns</h3>
                <p className="text-sm text-slate-600">30-day return policy</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">📞</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-slate-900">Support</h3>
                <p className="text-sm text-slate-600">Customer service 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
