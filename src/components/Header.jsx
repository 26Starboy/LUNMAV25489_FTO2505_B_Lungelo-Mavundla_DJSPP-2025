// src/components/Header.jsx
// Main header component with logo, navigation links, and theme toggle

import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="header">
      {/* Logo linking back to home */}
      <Link to="/" className="logo">Podcast Explorer</Link>

      {/* Main navigation links */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>

      {/* Button to toggle light/dark theme */}
      <ThemeToggle />
    </header>
  )
}
