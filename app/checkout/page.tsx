'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Removed unused imports: Badge, Separator
import { ShieldCheck, CreditCard, Truck, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/Container';
import CartSummary from '@/components/Cart/CartSummary';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/cart';

export default function CheckoutPage() {
  const { cart, isLoading } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  if (isLoading) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading checkout...</p>
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
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              You need to add items to your cart before you can checkout.
            </p>
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/products">
                Start Shopping
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    // In a real app, this would redirect to a success page
    alert('Order placed successfully! (This is a demo - no real transaction occurred)');
  };

  return (
    <div className="py-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/cart" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Checkout
          </h1>
          <p className="text-slate-600 mt-2">
            Complete your order for {cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Demo Warning */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Demo Store - No Real Transactions
                </h3>
                <p className="text-yellow-700 text-sm">
                  This is a demonstration e-commerce site. No real payments will be processed, 
                  no products will be shipped, and no personal information will be stored. 
                  All payment forms and checkout processes are for demonstration purposes only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                      Demo User
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                      Customer
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                    demo@threadlab.com
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Street Address</label>
                  <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                    123 Demo Street
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">City</label>
                    <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                      Demo City
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">State</label>
                    <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                      NY
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">ZIP Code</label>
                    <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                      10001
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Card Number</label>
                  <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                    •••• •••• •••• 1234 (Demo Card)
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Expiry Date</label>
                    <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                      12/28
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">CVC</label>
                    <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                      •••
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Cardholder Name</label>
                  <div className="h-10 bg-slate-100 rounded-lg flex items-center px-3 text-slate-500">
                    Demo Customer
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-slate-400 font-medium">
                          {item.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{item.name}</h3>
                        <p className="text-sm text-slate-600">
                          {item.color}, {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Place Order */}
          <div>
            <div className="sticky top-24 space-y-6">
              <CartSummary cart={cart} showActions={false} />
              
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg font-semibold"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing Order...
                      </div>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        Place Order
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-4 text-center text-xs text-slate-500">
                    <p>By placing this order, you agree to our</p>
                    <p>Terms of Service and Privacy Policy</p>
                  </div>
                </CardContent>
              </Card>

              {/* Security Badges */}
              <Card className="bg-slate-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <ShieldCheck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">
                      Secure Checkout
                    </h3>
                    <p className="text-xs text-slate-600">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
