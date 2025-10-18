import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function Navbar() {
  const location = useLocation()

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          🎧 PodcastHub
        </Link>
        
        <nav className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Discover
          </Link>
          <Link 
            to="/favorites" 
            className={location.pathname === '/favorites' ? 'nav-link active' : 'nav-link'}
          >
            Favorites
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}

export default Navbar