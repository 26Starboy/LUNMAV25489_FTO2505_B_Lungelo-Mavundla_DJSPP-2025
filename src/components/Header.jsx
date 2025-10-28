// Example: Header.jsx
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Podcast Explorer</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>
      <ThemeToggle />
    </header>
  )
}