"use client";

import React, { useEffect, useState, ChangeEvent } from "react"; // Added ChangeEvent
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // Use Next.js Link
import { useCart } from "@/context/CartContext"; // Use correct context path
import { ProductService } from "@/lib/services/ProductService"; // Use correct service path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming Input exists in ui
import { Label } from "@/components/ui/label"; // Added missing Label import
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingCart } from 'lucide-react'; // Import icons

// Define Product type (Consider moving to @/types/product.ts)
interface Product {
  id: number | string; // Allow string ID
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { // Make rating optional as it might not always be present
    rate: number;
    count: number;
  };
}

// Define Error type
interface FetchError extends Error {
    message: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>(''); // Add error state
  const [quantity, setQuantity] = useState<number>(1); // Add quantity state
  const { addToCart } = useCart();
  const router = useRouter(); // Keep Next.js router if needed for other actions

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      if (!params.id) {
          setError('Product ID is missing.');
          setLoading(false);
          return;
      }
      try {
        // Use ProductService
        const data = await ProductService.getProductById(params.id);
        setProduct(data);
      } catch (err) {
        setError((err as FetchError).message || `Failed to fetch product ${params.id}.`);
        console.error("Error fetching product:", err); // Keep console error
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]); // Dependency array

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (event.target.value === '') {
        setQuantity(1); // Default to 1 if input is cleared
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Use addToCart from CartContext
      addToCart(product, quantity);
      // Optionally add a toast notification here instead of alert
      console.log(`${quantity} x ${product.title} added to cart!`);
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/2 aspect-square rounded-3xl" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4 rounded-full" />
            <Skeleton className="h-6 w-1/4 rounded-full" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        <p>Error: {error}</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">Go back to Products</Link>
      </div>
    );
  }

  // --- Product Not Found State ---
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Product not found.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">Go back to Products</Link>
      </div>
    );
  }

  // --- Product Found State ---
  return (
    <div className="container mx-auto px-4 py-12">
       {/* Back Link */}
       <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      {/* Keep v0 Card styling */}
      <Card className="rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm bg-white/90">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Image Section - Use next/image */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden bg-white p-4 border">
                <Image
                  src={product.image || "/placeholder.svg"} // Use placeholder if no image
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority // Prioritize loading main product image
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 space-y-4">
              <span className="text-sm font-medium text-muted-foreground capitalize">{product.category}</span>
              <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
              {/* Rating (Optional Display) */}
              {product.rating && (
                <div className="flex items-center space-x-2">
                  {/* Basic text rating */}
                  <span className="text-sm text-muted-foreground">
                    ({product.rating.rate.toFixed(1)}/5 | {product.rating.count} reviews)
                  </span>
                  {/* Star icons can be added here if needed */}
                </div>
              )}
              <p className="text-muted-foreground">{product.description}</p>
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>

              {/* Add to Cart */}
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
                  <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 rounded-md border-gray-300" // Adjusted styling
                  />
                </div>
                <Button size="lg" onClick={handleAddToCart} className="rounded-full"> {/* Kept rounded style */}
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
