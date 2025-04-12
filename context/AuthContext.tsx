"use client"; // Add this directive

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types
// Basic user structure, can be expanded later
interface User {
  username: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
}

// Create context with an initial value
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // Initialize token state to null, load from localStorage in useEffect
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Keep loading state

  useEffect(() => {
    // Load token from localStorage only on the client side
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // TODO: Optionally validate the token with the backend here
      // For now, just assume the token is valid if it exists
      // Placeholder: Decode token or fetch user profile
      // For simplicity, we'll just set a dummy user object if token exists
      // In a real app, fetch user details based on the token
      setUser({ username: 'dummyUser' }); // Replace with actual user data later
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []); // Run only once on mount

  const login = (userData: User, authToken: string) => {
    localStorage.setItem('authToken', authToken);
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user, // Boolean flag for convenience
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Exporting context itself might be useful but generally useAuth hook is preferred
export default AuthContext;
