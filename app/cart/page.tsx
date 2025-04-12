"use client";

import React, { useEffect, useState } from "react"; // Import React
import { useRouter } from "next/navigation";
import Link from "next/link"; // Use Next.js Link
import { useAuth } from "@/context/AuthContext"; // Use correct context path
import { useCart } from "@/context/CartContext"; // Use correct context path
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CartItem from "@/components/CartItem"; // Import CartItem
import OrderSummary from "@/components/OrderSummary"; // Import OrderSummary
import { ArrowLeft } from 'lucide-react'; // Import icon

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  // Use cart state and functions from the correct context
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Effect to hide the order placed message after a delay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (orderPlaced) {
      timer = setTimeout(() => {
        setOrderPlaced(false);
      }, 4000); // Hide after 4 seconds
    }
    return () => clearTimeout(timer);
  }, [orderPlaced]);

  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated (redirect handled by useEffect)
  }

  const handleCheckout = () => {
    console.log('Simulating checkout...');
    // Simulate checkout success
    clearCart();
    setOrderPlaced(true); // Show success message
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Keep the background elements from v0 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="floating-slow absolute top-40 left-20 w-32 h-32 bg-purple-300 rounded-3xl opacity-30"></div>
        <div className="floating absolute bottom-40 right-20 w-40 h-40 bg-secondary rounded-3xl opacity-30"></div>
      </div>

      <Card className="rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm bg-white/90">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">Your Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Order Placed Alert */}
          {orderPlaced && (
            <Alert className="mb-6 bg-green-100 border-green-300 text-green-800 rounded-lg"> {/* Adjusted styling */}
              <AlertDescription>
                Order placed successfully! Thank you for your purchase.
              </AlertDescription>
            </Alert>
          )}

          {/* Empty Cart Message */}
          {cartItems.length === 0 && !orderPlaced ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">Your cart is empty.</p>
              <Button asChild className="rounded-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </div>
          ) : null}

          {/* Cart Items List */}
          {cartItems.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity} // Pass context functions
                    onRemoveItem={removeFromCart}   // Pass context functions
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                 <OrderSummary total={cartTotal} onCheckout={handleCheckout} />
                 <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="w-full mt-4"
                  >
                    Clear Cart
                  </Button>
              </div>
            </div>
          )}
        </CardContent>
        {/* Footer removed as OrderSummary now contains the checkout button */}
      </Card>
    </div>
  );
}
