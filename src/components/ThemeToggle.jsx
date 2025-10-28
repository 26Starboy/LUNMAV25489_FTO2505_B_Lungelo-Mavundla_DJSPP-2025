import { usePodcastStore } from '../store/usePodcastStore'

export default function ThemeToggle() {
  const { theme, setTheme } = usePodcastStore()
  return (
    <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}