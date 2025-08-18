import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Modern Clothing for the{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Contemporary Lifestyle
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover Thread Lab&apos;s curated collection of premium essentials. 
              Quality craftsmanship meets timeless design in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link href="/products">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-2xl"
                asChild
              >
                <Link href="#featured">
                  Explore Featured
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium">4.8/5 from 2,000+ reviews</span>
              </div>
              <div className="h-px sm:h-6 w-16 sm:w-px bg-slate-300"></div>
              <div>
                <span className="font-medium">Free shipping on orders over $75</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Handpicked essentials that define modern style. Each piece is crafted 
              with attention to detail and built to last.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-2xl"
              asChild
            >
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Thread Lab
            </h2>
            <p className="text-lg text-slate-600">
              We&apos;re committed to providing an exceptional shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="h-16 w-16 mx-auto mb-6 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Free Shipping</h3>
              <p className="text-slate-600">
                Complimentary shipping on all orders over $75. Fast delivery in 2-3 business days.
              </p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 mx-auto mb-6 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <RefreshCw className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">30-Day Returns</h3>
              <p className="text-slate-600">
                Not satisfied? Return any item within 30 days for a full refund, no questions asked.
              </p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <Shield className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Secure Checkout</h3>
              <p className="text-slate-600">
                Shop with confidence. Your payment information is protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-3xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Stay in Style
            </h2>
            <p className="text-lg mb-8 text-indigo-100 max-w-2xl mx-auto">
              Be the first to know about new collections, exclusive offers, and style tips. 
              Join our community of fashion enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button 
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-2xl font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
