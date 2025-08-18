'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { 
  getAllProducts, 
  filterProducts, 
  sortProducts, 
  getUniqueCategories, 
  getUniqueColors, 
  getUniqueSizes,
  ProductFilters,
  ProductSort
} from '@/lib/products';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sort, setSort] = useState<ProductSort>({ field: 'name', direction: 'asc' });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = getUniqueCategories();
  const colors = getUniqueColors();
  const sizes = getUniqueSizes();

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    const products = filterProducts(allProducts, filters);
    return sortProducts(products, sort);
  }, [allProducts, filters, sort]);

  const handleFilterChange = (key: keyof ProductFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="py-8">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-slate-600">
            Discover our complete collection of modern essentials
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  Filters
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      Clear all
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Category</h3>
                  <div className="space-y-2">
                    <Button
                      variant={!filters.category ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleFilterChange('category', undefined)}
                    >
                      All Categories
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={filters.category === category ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleFilterChange('category', category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Color</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleFilterChange('color', 
                          filters.color === color.name ? undefined : color.name
                        )}
                        className={`
                          w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                          ${filters.color === color.name 
                            ? 'border-indigo-500 ring-2 ring-indigo-200' 
                            : 'border-slate-300 hover:border-slate-400'
                          }
                        `}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {filters.color === color.name && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  {filters.color && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFilterChange('color', undefined)}
                      className="mt-2 w-full"
                    >
                      Clear Color
                    </Button>
                  )}
                </div>

                {/* Size Filter */}
                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={filters.size === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFilterChange('size', 
                          filters.size === size ? undefined : size
                        )}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Controls */}
            <div className="lg:hidden mb-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <Card className="lg:hidden mb-6">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Category
                      </label>
                      <Select
                        value={filters.category || ''}
                        onValueChange={(value) => handleFilterChange('category', value || undefined)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Color
                      </label>
                      <Select
                        value={filters.color || ''}
                        onValueChange={(value) => handleFilterChange('color', value || undefined)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Colors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Colors</SelectItem>
                          {colors.map((color) => (
                            <SelectItem key={color.name} value={color.name}>
                              {color.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Size */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Size
                      </label>
                      <Select
                        value={filters.size || ''}
                        onValueChange={(value) => handleFilterChange('size', value || undefined)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Sizes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Sizes</SelectItem>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {activeFilterCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Sort and Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <p className="text-slate-600">
                {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
              </p>
              
              <div className="flex items-center gap-4">
                <label className="text-sm text-slate-600">Sort by:</label>
                <Select
                  value={`${sort.field}-${sort.direction}`}
                  onValueChange={(value) => {
                    const [field, direction] = value.split('-') as [ProductSort['field'], ProductSort['direction']];
                    setSort({ field, direction });
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-slate-600">Active filters:</span>
                {filters.category && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange('category', undefined)}
                      className="ml-1 text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.color && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Color: {filters.color}
                    <button
                      onClick={() => handleFilterChange('color', undefined)}
                      className="ml-1 text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.size && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Size: {filters.size}
                    <button
                      onClick={() => handleFilterChange('size', undefined)}
                      className="ml-1 text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
