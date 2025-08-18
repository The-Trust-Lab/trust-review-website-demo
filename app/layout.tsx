import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Thread Lab - Modern Clothing for the Contemporary Lifestyle",
  description: "Discover Thread Lab's curated collection of modern clothing. Quality craftsmanship meets timeless design. Shop premium tees, hoodies, jeans, and accessories.",
  keywords: "clothing, fashion, modern, contemporary, premium, tees, hoodies, jeans, accessories",
  authors: [{ name: "Thread Lab" }],
  creator: "Thread Lab",
  publisher: "Thread Lab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://threadlab.com",
    title: "Thread Lab - Modern Clothing",
    description: "Quality craftsmanship meets timeless design",
    siteName: "Thread Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thread Lab - Modern Clothing",
    description: "Quality craftsmanship meets timeless design",
    creator: "@threadlab",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
