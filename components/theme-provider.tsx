'use client'

import * as React from 'react'
// Removed useState, useEffect imports
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Reverted to simple wrapper
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
