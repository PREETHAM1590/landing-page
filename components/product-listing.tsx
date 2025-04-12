"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

// Animation classes for cards
const cardAnimations = [
  "card-float",
  "card-rotate",
  "card-scale",
  "card-tilt",
  "card-glow",
  "card-3d-rotate",
  "card-pulse",
  "card-shake",
]

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    setFilteredProducts(result)
  }, [selectedCategory, searchQuery, products])

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category)
    setLoading(true)

    try {
      let data
      if (category === "all") {
        const response = await fetch("https://fakestoreapi.com/products")
        data = await response.json()
      } else {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
        data = await response.json()
      }
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Error fetching products by category:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is handled by the useEffect
  }

  // Assign a random animation class to each product
  const getAnimationClass = (index: number) => {
    return cardAnimations[index % cardAnimations.length]
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 space-y-6 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Discover Products</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of high-quality products with amazing 3D animations
        </p>

        <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 rounded-full bg-white/80 backdrop-blur-sm"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </form>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange("all")}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="rounded-full"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border rounded-3xl p-4 h-[360px] flex flex-col">
                <Skeleton className="w-full h-40 rounded-2xl" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                  <Skeleton className="h-8 w-full mt-4" />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`${index % 2 === 0 ? "floating-slow" : index % 3 === 0 ? "floating-rotate" : "floating"}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <ProductCard product={product} animationClass={getAnimationClass(index)} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
