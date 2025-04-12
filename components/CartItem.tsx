import React, { ChangeEvent } from 'react';
import Image from 'next/image'; // Import next/image
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import type { Product } from '@/types/product'; // Import central Product type

// Define CartItem based on Product, adding quantity
interface CartItem extends Product {
  quantity: number;
}

interface CartItemProps {
  item: CartItem; // Use updated CartItem type
  // Assuming context functions handle number conversion if needed
  onUpdateQuantity: (productId: number | string, newQuantity: number | string) => void;
  onRemoveItem: (productId: number | string) => void;
}

function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps): JSX.Element | null {
  if (!item) return null;

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => { // Type event
    const newQuantity = e.target.value;
    // Context handles validation (removes if < 1 or NaN)
    onUpdateQuantity(item.id, newQuantity);
  };

  // Apply Tailwind classes
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-card text-card-foreground">
      {/* Image - Use next/image */}
      <div className="relative w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden p-1 bg-white">
        <Image
          src={item.image || "/placeholder.svg"} // Add placeholder fallback
          alt={item.title}
          fill // Use fill layout
          className="object-contain"
          sizes="80px" // Provide sizes hint
        />
      </div>
      {/* Details */}
      <div className="flex-grow space-y-1">
        <h5 className="font-medium line-clamp-2">{item.title}</h5>
        <p className="text-sm text-muted-foreground">
          Price: ${item.price.toFixed(2)}
        </p>
        <p className="text-sm font-semibold">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      {/* Controls */}
      <div className="flex flex-col items-end space-y-2">
         <div className="flex items-center space-x-2">
            <label htmlFor={`quantity-${item.id}`} className="text-xs sr-only">Qty:</label> {/* Screen reader only label */}
            <Input
              type="number"
              id={`quantity-${item.id}`}
              value={item.quantity}
              min="1"
              onChange={handleQuantityChange}
              className="w-16 h-8 text-center" // Smaller input
              aria-label={`Quantity for ${item.title}`}
            />
         </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemoveItem(item.id)}
          aria-label={`Remove ${item.title} from cart`}
        >
          <X className="h-4 w-4" /> {/* Remove icon */}
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
