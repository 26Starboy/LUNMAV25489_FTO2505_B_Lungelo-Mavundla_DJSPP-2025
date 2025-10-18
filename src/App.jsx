import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { PlayerProvider } from './context/PlayerContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Navbar from './components/Navbar'
import AudioPlayer from './components/AudioPlayer'
import LandingPage from './pages/LandingPage'
import ShowDetailPage from './pages/ShowDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import './styles/globals.css'
import './styles/components.css'

function App() {
  const location = useLocation()

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const audio = document.querySelector('audio')
      if (audio && !audio.paused) {
        e.preventDefault()
        e.returnValue = 'Audio is currently playing. Are you sure you want to leave?'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <PlayerProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes location={location}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/show/:id" element={<ShowDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
            <AudioPlayer />
          </div>
        </PlayerProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App