"use client"; // Required for hooks like useState, useEffect

import React, { useState, useEffect } from 'react';
import { ProductService } from '@/lib/services/ProductService'; // Updated import path
import FilterBar from '@/components/FilterBar'; // Updated import path
import ProductGrid from '@/components/ProductGrid'; // Updated import path
import type { Product } from '@/types/product'; // Import central Product type

// Define Error type
interface FetchError extends Error {
    message: string;
}

export default function HomePage(): JSX.Element { // Renamed component to HomePage
  const [products, setProducts] = useState<Product[]>([]); // Use imported Product type
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await ProductService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        // Optionally set an error state for categories
      }
    };
    fetchCategories();
  }, []);

  // Fetch products based on selected category or all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        let fetchedProducts: Product[]; // Use imported Product type
        if (selectedCategory) {
          fetchedProducts = await ProductService.getProductsByCategory(selectedCategory);
        } else {
          fetchedProducts = await ProductService.getProducts();
        }
        setProducts(fetchedProducts);
      } catch (err) {
        setError((err as FetchError).message || 'Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Re-run effect when selectedCategory changes

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Render the page layout with FilterBar and ProductGrid
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 container mx-auto"> {/* Added container */}
      <aside className="w-full md:w-1/5 lg:w-1/6 flex-shrink-0">
        <FilterBar
          categories={categories}
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
      </aside>
      <main className="flex-grow">
        {loading && <p className="text-center py-8">Loading products...</p>}
        {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}
        {!loading && !error && <ProductGrid products={products} />}
      </main>
    </div>
  );
}
