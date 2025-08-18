import { Product } from './products';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'threadlab_cart';

export function getCartFromStorage(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], total: 0, itemCount: 0 };
  }

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
      const cart = JSON.parse(cartData) as Cart;
      return {
        ...cart,
        total: calculateCartTotal(cart.items),
        itemCount: calculateItemCount(cart.items)
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }

  return { items: [], total: 0, itemCount: 0 };
}

export function saveCartToStorage(cart: Cart): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

export function addToCart(
  product: Product,
  variant: { color: string; size: string },
  quantity: number = 1
): CartItem {
  const cartItem: CartItem = {
    id: `${product.id}-${variant.color}-${variant.size}`,
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    color: variant.color,
    size: variant.size,
    quantity
  };

  return cartItem;
}

export function updateCartItem(cart: Cart, itemId: string, updates: Partial<CartItem>): Cart {
  const updatedItems = cart.items.map(item => 
    item.id === itemId ? { ...item, ...updates } : item
  );

  return {
    items: updatedItems,
    total: calculateCartTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems)
  };
}

export function removeCartItem(cart: Cart, itemId: string): Cart {
  const updatedItems = cart.items.filter(item => item.id !== itemId);

  return {
    items: updatedItems,
    total: calculateCartTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems)
  };
}

export function clearCart(): Cart {
  return { items: [], total: 0, itemCount: 0 };
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getCartItemCount(cart: Cart, productId: string, variant?: { color: string; size: string }): number {
  if (!variant) {
    return cart.items
      .filter(item => item.productId === productId)
      .reduce((count, item) => count + item.quantity, 0);
  }

  const itemId = `${productId}-${variant.color}-${variant.size}`;
  const item = cart.items.find(item => item.id === itemId);
  return item ? item.quantity : 0;
}

export function isItemInCart(cart: Cart, productId: string, variant: { color: string; size: string }): boolean {
  const itemId = `${productId}-${variant.color}-${variant.size}`;
  return cart.items.some(item => item.id === itemId);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function calculateShipping(total: number): number {
  // Free shipping over $75
  return total >= 75 ? 0 : 9.99;
}

export function calculateTax(subtotal: number): number {
  // Simple 8.5% tax calculation
  return subtotal * 0.085;
}

export function calculateOrderTotal(subtotal: number): {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
} {
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total
  };
}
