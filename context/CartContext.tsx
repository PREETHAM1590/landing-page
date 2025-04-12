"use client"; // Add this directive

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { Product } from '@/types/product'; // Import central Product type

// Define CartItem based on the imported Product type
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number | string, newQuantity: number | string) => void;
  removeFromCart: (productId: number | string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

// Create context with an initial value (can be null or a default object)
const CartContext = createContext<CartContextType | null>(null);

// Helper function to calculate total price
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Initialize cart state to empty array directly
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false); // Add state to track loading

  // Load cart from localStorage only on the client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
    }
    setIsCartLoaded(true); // Mark cart as loaded
  }, []); // Run only once on mount

  // Persist cart state to localStorage whenever it changes, only after initial load
  useEffect(() => {
    if (isCartLoaded) { // Prevent overwriting on initial render before load
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  // Ensure addToCart receives the full Product object
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: number | string, newQuantity: number | string) => {
    const quantityNum = typeof newQuantity === 'string' ? parseInt(newQuantity, 10) : newQuantity;

    // Use === comparison for NaN check
    if (isNaN(quantityNum) || quantityNum < 1) {
      // If quantity is invalid or less than 1, remove the item
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: quantityNum } : item
      )
    );
  };

  const removeFromCart = (productId: number | string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = calculateTotal(cartItems);

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount, // Total number of items (sum of quantities)
    cartTotal, // Total price
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === null) { // Check for null instead of undefined
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Exporting context itself might be useful but generally useCart hook is preferred
// export default CartContext;
