import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Home } from 'lucide-react';
import Container from '@/components/Container';

export default function NotFound() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Products
                </Link>
              </Button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                What you can do:
              </h3>
              <ul className="text-left text-slate-600 space-y-2 max-w-md mx-auto">
                <li>• Check the URL for typos</li>
                <li>• Go back to the homepage</li>
                <li>• Browse our product collection</li>
                <li>• Use the search feature</li>
                <li>• Contact our customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
