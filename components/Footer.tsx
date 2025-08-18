import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <Container>
        <div className="py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TL</span>
                </div>
                <span className="font-bold text-xl text-slate-800">Thread Lab</span>
              </Link>
              <p className="text-slate-600 text-sm max-w-xs">
                Modern clothing for the contemporary lifestyle. Quality craftsmanship meets timeless design.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Shop column */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Tops" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Tops
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Bottoms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Bottoms
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Outerwear" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Outerwear
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Accessories" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service column */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Benefits bar */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Free Returns</h4>
                  <p className="text-xs text-slate-600">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">⚡</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Fast Shipping</h4>
                  <p className="text-xs text-slate-600">Free shipping over $75</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">🔒</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Secure Checkout</h4>
                  <p className="text-xs text-slate-600">SSL encrypted payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} Thread Lab. All rights reserved.
            </p>
            <p className="text-sm text-slate-500">
              Made with ❤️ for fashion lovers
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
