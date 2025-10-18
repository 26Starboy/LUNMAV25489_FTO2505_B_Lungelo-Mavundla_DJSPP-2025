import { useTheme } from '../hooks/useTheme'

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle