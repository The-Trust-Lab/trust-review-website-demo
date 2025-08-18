# Thread Lab - Modern Clothing E-commerce Demo

A complete e-commerce demonstration site built with Next.js, featuring modern design, full shopping cart functionality, and comprehensive product reviews.

## 🌟 Features

### Core Functionality
- **Homepage**: Hero section, featured products, benefits showcase
- **Product Listing**: Filter by category, color, size with sorting options
- **Product Details**: Image gallery, variant selection, detailed reviews system
- **Shopping Cart**: Persistent cart with localStorage, quantity management
- **Checkout**: Complete checkout flow (demo only - no real transactions)
- **Reviews System**: Customer reviews with ratings, filtering, and ability to add new reviews

### Design & UX
- **Modern Design**: Clean, professional interface with Thread Lab branding
- **Responsive**: Mobile-first design that works on all devices
- **Accessibility**: Semantic HTML and ARIA attributes
- **Performance**: Optimized components and lazy loading
- **Brand Consistency**: Cohesive color scheme and typography

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Server Components**: Optimized rendering with Next.js App Router
- **State Management**: React Context for cart management
- **Local Persistence**: Cart data persists across browser sessions
- **Component Library**: shadcn/ui components with Tailwind CSS
- **Icons**: Lucide React for consistent iconography

## 🎨 Brand & Design

### Brand Identity
- **Brand Name**: Thread Lab
- **Theme**: Modern, clean, youthful but professional
- **Primary Color**: Indigo (#4f46e5)
- **Secondary Color**: Emerald (#10b981)
- **Neutral Palette**: Slate tones for text, backgrounds, and borders

### Typography
- **Font Family**: Inter (fallback to system fonts)
- **Design System**: Consistent spacing, rounded corners (rounded-2xl), subtle shadows

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context + localStorage
- **Data**: Static JSON files (products.json, reviews.json)

## 📁 Project Structure

```
thread-lab/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                  # Homepage
│   ├── products/
│   │   ├── page.tsx              # Product listing with filters
│   │   └── [slug]/
│   │       ├── page.tsx          # Product detail page
│   │       └── ProductDetailClient.tsx
│   ├── cart/page.tsx             # Shopping cart
│   ├── checkout/page.tsx         # Checkout flow
│   └── not-found.tsx             # 404 page
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── Cart/                     # Cart-related components
│   ├── Reviews/                  # Review system components
│   ├── Header.tsx                # Site header with navigation
│   ├── Footer.tsx                # Site footer
│   ├── Container.tsx             # Layout container
│   ├── ProductCard.tsx           # Product grid item
│   └── RatingStars.tsx           # Star rating component
├── lib/
│   ├── products.ts               # Product utilities
│   ├── reviews.ts                # Review utilities
│   ├── cart.ts                   # Cart utilities
│   ├── cart-context.tsx          # Cart state management
│   └── utils.ts                  # General utilities
└── data/
    ├── products.json             # Product database
    └── reviews.json              # Reviews database
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trust-review-website-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🛍 Product Catalog

The demo includes 5 carefully curated products:

1. **Classic Tee** ($29.99) - Premium organic cotton t-shirt
2. **Premium Hoodie** ($79.99) - French terry hoodie with oversized fit
3. **Slim Fit Jeans** ($89.99) - Stretch denim with modern cut
4. **Lightweight Windbreaker** ($65.99) - Packable water-resistant jacket
5. **Canvas Cap** ($34.99) - Classic 6-panel adjustable cap

Each product includes:
- Multiple color options
- Size variations
- Detailed descriptions
- Care instructions
- 10+ authentic customer reviews

## 📱 Responsive Design

The site is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Mobile-optimized navigation with drawer
- Collapsible product filters
- Touch-friendly interfaces
- Optimized image loading

## 🛒 Shopping Experience

### Cart Functionality
- Add products with specific variants (color/size)
- Update quantities
- Remove items
- Persistent storage across sessions
- Real-time total calculation
- Free shipping threshold indicator

### Checkout Process
- Order summary with itemized costs
- Shipping and tax calculation
- Security badges and trust signals
- Demo-safe (no real payment processing)

## ⭐ Review System

Comprehensive review functionality:
- Star ratings (1-5 stars)
- Written reviews with author attribution
- Review filtering by rating
- Sorting by date, rating, helpfulness
- Verified purchase badges
- Review summary with rating distribution
- Add new reviews (client-side demo)

## 🎯 Performance & SEO

- **Lighthouse Scores**: Performance ≥90, Accessibility ≥90
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Performance**: Optimized images, code splitting, minimal bundle size
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## 🔒 Demo Limitations

**Important**: This is a demonstration site only:
- No real payment processing
- No user accounts or authentication  
- No backend database
- No email notifications
- No inventory management
- Reviews are stored locally only

## 🤝 Contributing

This is a demo project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for demonstration purposes. Feel free to use as a reference for your own projects.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling approach
- **Lucide React** for the icon set
- **Next.js** for the excellent React framework

---

**Thread Lab** - Modern clothing for the contemporary lifestyle.

*Built with ❤️ for fashion lovers*