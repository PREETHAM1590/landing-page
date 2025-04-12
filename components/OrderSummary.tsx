import React from 'react';
import { useCart } from '@/context/CartContext'; // Updated context path
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderSummaryProps {
  total: number;
  onCheckout: () => void; // Type the checkout function prop
}

function OrderSummary({ total, onCheckout }: OrderSummaryProps): JSX.Element { // Add types
  const { cartCount } = useCart(); // Get cartCount from context

  // Use shadcn Card and Tailwind classes for styling
  return (
    <Card className="sticky top-24"> {/* Make summary sticky */}
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>Total Items:</span>
          <span>{cartCount}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total Price:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onCheckout} className="w-full" size="lg">
          Proceed to Checkout (Simulated)
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OrderSummary;
