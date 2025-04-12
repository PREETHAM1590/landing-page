"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext" // Updated context path
import { useCart } from "@/context/CartContext" // Updated context path
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, LogOut, LogIn } from "lucide-react" // Added LogIn
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth() // Get user from context
  const { cartItems } = useCart() // Use cartItems from context
  const router = useRouter()

  const handleLogout = () => {
    logout()
    // No need to manually push, AuthProvider might handle redirect or rely on page logic
  }

  // Calculate cart count from cartItems
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> {/* Use shopping-app styling */}
      <div className="container flex h-14 items-center justify-between"> {/* Adjusted height and spacing */}
        <Link href="/" className="flex items-center space-x-2 mr-6"> {/* Added margin */}
          {/* <ShoppingCart className="h-6 w-6" /> Optional: Add logo icon */}
          <span className="text-xl font-bold text-primary">Shopme</span> {/* Updated Brand Name & Size */}
        </Link>

        {/* Mobile menu button - Keep this functionality */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-grow"> {/* Added flex-grow */}
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Products
          </Link>
          {/* Removed extra links */}
        </nav>

        {/* Auth and Cart Section */}
        <div className="hidden md:flex items-center justify-end space-x-4"> {/* Hide on mobile initially */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon"> {/* Use ghost button */}
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"> {/* Adjusted badge */}
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden lg:inline-block"> {/* Hide on smaller screens */}
                Welcome, {user?.username || 'User'}!
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                 <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-14 z-50 bg-background/95 backdrop-blur-sm md:hidden"> {/* Adjusted top offset */}
            <nav className="flex flex-col p-6 space-y-4"> {/* Increased padding */}
              <Link
                href="/"
                className="flex items-center py-2 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {/* Removed extra links */}
              <Link
                href="/cart"
                className="flex items-center py-2 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> {/* Added icon */}
                <span className="mr-2">Cart</span>
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="h-5 px-1.5 text-xs"> {/* Adjusted badge */}
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
              <hr className="border-border" /> {/* Added separator */}
              {isAuthenticated ? (
                <Button variant="ghost" className="justify-start text-lg" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start text-lg w-full">
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
        {/* Removed extra fragment </> */}
      </div>
    </header>
  )
}
