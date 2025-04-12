"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext" // Updated context path
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/types/product" // Use existing type path
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
  animationClass?: string
}

export default function ProductCard({ product, animationClass = "card-float" }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation on button click
    e.stopPropagation() // Stop event bubbling
    // Assuming addToCart in CartContext takes (product, quantity)
    addToCart(product, 1)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className={`h-full overflow-hidden rounded-3xl shadow-lg ${animationClass}`}>
        <div className="relative aspect-square bg-white p-4">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
            </div>
          )}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className={`object-contain p-4 transition-opacity duration-300 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoadingComplete={() => setIsImageLoading(false)}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <CardContent className="p-4 bg-white">
          <div className="mb-2 line-clamp-2 min-h-[3rem] font-medium">{product.title}</div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500 capitalize">{product.category}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 bg-white">
          <Button onClick={handleAddToCart} className="w-full rounded-full" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
