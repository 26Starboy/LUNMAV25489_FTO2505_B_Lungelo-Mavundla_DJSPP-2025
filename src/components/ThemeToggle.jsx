// src/components/ThemeToggle.jsx
import { usePodcastStore } from '../store/usePodcastStore' // Zustand store managing theme

export default function ThemeToggle() {
  // ----------------------------
  // Get current theme and setter from store
  // ----------------------------
  const { theme, setTheme } = usePodcastStore()

  // ----------------------------
  // Toggle theme between light and dark
  // ----------------------------
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // ----------------------------
  // Render button with dynamic label
  // ----------------------------
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}
