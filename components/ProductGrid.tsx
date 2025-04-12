import React from 'react';
import ProductCard from '@/components/product-card'; // Use correct path alias
import type { Product } from '@/types/product'; // Import central Product type

interface ProductGridProps {
  products: Product[]; // Use imported Product type
}

// Use Tailwind classes directly if needed, or rely on ProductCard styling
function ProductGrid({ products }: ProductGridProps) { // Add type to props
  if (!products || products.length === 0) {
    // Use Tailwind for styling the message
    return <p className="text-center text-muted-foreground py-8">No products found.</p>;
  }

  return (
    // Apply Tailwind grid classes here
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6"> {/* Increased gap and padding */}
      {products.map((product) => (
        // Pass product data to the shadcn ProductCard
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
