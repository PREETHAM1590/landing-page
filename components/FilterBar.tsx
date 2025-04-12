import React from 'react';
import { Button } from '@/components/ui/button'; // Import shadcn Button
import { cn } from '@/lib/utils'; // Import cn utility

interface FilterBarProps {
  categories: string[];
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

function FilterBar({ categories, onSelectCategory, selectedCategory }: FilterBarProps): JSX.Element { // Add types
  // Basic loading state
  if (!categories || categories.length === 0) {
    // Add some basic styling for loading state
    return (
      <aside className="p-4 border rounded-md bg-card text-card-foreground">
        <h4 className="mb-4 text-lg font-semibold">Categories</h4>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </aside>
    );
  }

  return (
    // Use Tailwind for layout and styling
    <aside className="p-4 border rounded-md bg-card text-card-foreground">
      <h4 className="mb-4 text-lg font-semibold">Categories</h4>
      <div className="space-y-2 flex flex-col items-start"> {/* Stack buttons vertically */}
        <Button
          variant={!selectedCategory ? "secondary" : "ghost"} // Highlight if active
          size="sm"
          className="w-full justify-start" // Align text left
          onClick={() => onSelectCategory(null)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "secondary" : "ghost"} // Highlight if active
            size="sm"
            className="w-full justify-start capitalize" // Align text left and capitalize
            onClick={() => onSelectCategory(cat)}
          >
            {/* Capitalization handled by CSS class */}
            {cat}
          </Button>
        ))}
      </div>
      {/* Optional: Add Search functionality here later */}
    </aside>
  );
}

export default FilterBar;
