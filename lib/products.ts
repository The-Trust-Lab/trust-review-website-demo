import productsData from '@/data/products.json';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
  colors: { name: string; value: string }[];
  sizes: string[];
  details: {
    material: string;
    fit: string;
    care: string;
    origin: string;
  };
}

export interface ProductFilters {
  category?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating';
  direction: 'asc' | 'desc';
}

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProduct(slug: string): Product | null {
  const product = productsData.find(p => p.slug === slug) as Product;
  return product || null;
}

export function getFeaturedProducts(): Product[] {
  return productsData.filter(p => p.featured) as Product[];
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.filter(p => p.category === category) as Product[];
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.color) {
    filtered = filtered.filter(p => 
      p.colors.some(color => color.name.toLowerCase() === filters.color!.toLowerCase())
    );
  }

  if (filters.size) {
    filtered = filtered.filter(p => 
      p.sizes.includes(filters.size!)
    );
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!);
  }

  return filtered;
}

export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const sorted = [...products];

  return sorted.sort((a, b) => {
    let comparison = 0;

    switch (sort.field) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'rating':
        // This would need to be calculated from reviews
        // For now, use a random sort
        comparison = Math.random() - 0.5;
        break;
      default:
        return 0;
    }

    return sort.direction === 'asc' ? comparison : -comparison;
  });
}

export function getUniqueCategories(): string[] {
  const categories = productsData.map(p => p.category);
  return [...new Set(categories)];
}

export function getUniqueColors(): { name: string; value: string }[] {
  const allColors = productsData.flatMap(p => p.colors);
  const uniqueColors = allColors.filter((color, index, self) => 
    index === self.findIndex(c => c.name === color.name)
  );
  return uniqueColors;
}

export function getUniqueSizes(): string[] {
  const allSizes = productsData.flatMap(p => p.sizes);
  return [...new Set(allSizes)];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
