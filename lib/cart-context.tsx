'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  Cart, 
  CartItem, 
  getCartFromStorage, 
  saveCartToStorage, 
  calculateCartTotal, 
  calculateItemCount,
  addToCart as addItemToCart
} from './cart';
import { Product } from './products';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, variant: { color: string; size: string }, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'LOAD_CART'; payload: Cart }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean };

function cartReducer(state: Cart & { isLoading: boolean }, action: CartAction): Cart & { isLoading: boolean } {
  let newItems: CartItem[];
  
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...action.payload,
        isLoading: false
      };
      
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, action.payload];
      }
      
      return {
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: calculateItemCount(newItems),
        isLoading: false
      };
      
    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: calculateItemCount(newItems),
        isLoading: false
      };
      
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        // Remove item if quantity is 0 or negative
        newItems = state.items.filter(item => item.id !== action.payload.itemId);
      } else {
        newItems = state.items.map(item =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      
      return {
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: calculateItemCount(newItems),
        isLoading: false
      };
      
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
        isLoading: false
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
      
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: true
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getCartFromStorage();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      const cartToSave = {
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      };
      saveCartToStorage(cartToSave);
    }
  }, [state.items, state.total, state.itemCount, state.isLoading]);

  const addToCart = (product: Product, variant: { color: string; size: string }, quantity: number = 1) => {
    const cartItem = addItemToCart(product, variant, quantity);
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const contextValue: CartContextType = {
    cart: {
      items: state.items,
      total: state.total,
      itemCount: state.itemCount
    },
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading: state.isLoading
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
