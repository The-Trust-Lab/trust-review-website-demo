'use client';

import { useState } from 'react';
// Removed unused import: Image
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, X, Heart } from 'lucide-react';
import { CartItem as CartItemType, formatPrice } from '@/lib/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      onUpdateQuantity(item.id, newQuantity);
      await new Promise(resolve => setTimeout(resolve, 200)); // Small delay for UX
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="flex gap-4 py-6 border-b border-slate-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link href={`/products/${item.productId}`}>
          <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
            {/* Placeholder for product image */}
            <div className="text-center text-slate-400">
              <span className="text-xs font-medium">
                {item.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <Link 
              href={`/products/${item.productId}`}
              className="font-medium text-slate-900 hover:text-indigo-600 transition-colors"
            >
              {item.name}
            </Link>
            <div className="mt-1 text-sm text-slate-600 space-y-1">
              <p>Color: {item.color}</p>
              <p>Size: {item.size}</p>
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900">
              {formatPrice(item.price)}
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-slate-400 hover:text-red-500 p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity Controls & Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Quantity Controls */}
            <div className="flex items-center border border-slate-200 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
                disabled={isUpdating || item.quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Mobile Quantity Selector */}
            <div className="sm:hidden">
              <Select
                value={item.quantity.toString()}
                onValueChange={(value) => handleQuantityChange(parseInt(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Item Total & Actions */}
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">
              {formatPrice(item.price * item.quantity)}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-500 hover:text-slate-700 p-2"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
