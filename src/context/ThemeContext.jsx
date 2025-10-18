import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false) // Default to light mode
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load theme from localStorage after component mounts
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        setIsDarkMode(true)
      } else if (saved === 'light') {
        setIsDarkMode(false)
      }
      // If no saved theme, use system preference
      else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }, [isDarkMode, isLoaded])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const value = {
    isDarkMode,
    toggleTheme,
    isLoaded
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }