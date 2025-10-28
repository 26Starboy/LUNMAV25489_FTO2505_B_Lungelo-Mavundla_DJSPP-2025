// src/pages/Favourites.jsx
import { useFavorites } from '../store/useFavorites'  // Correct path
import { fetchShows } from '../api/client'
import { useState, useEffect } from 'react'
import PodcastCard from '../components/PodcastCard'

export default function Favourites() {
  const { favorites } = useFavorites()
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length === 0) {
      setShows([])
      setLoading(false)
      return
    }

    fetchShows().then(allShows => {
      const favShows = allShows.filter(s => favorites.includes(s.id))
      setShows(favShows)
      setLoading(false)
    })
  }, [favorites])

  if (loading) return <p>Loading favorites...</p>
  if (shows.length === 0) return <p>No favorites yet. Click the heart on any show!</p>

  return (
    <div className="podcast-grid">
      {shows.map(show => (
        <PodcastCard key={show.id} podcast={show} />
      ))}
    </div>
  )
}