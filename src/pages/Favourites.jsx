// src/pages/Favourites.jsx
import { useFavorites } from '../store/useFavorites'  // Zustand store for favorites
import { fetchShows } from '../api/client'            // API client to fetch all shows
import { useState, useEffect } from 'react'          // React hooks
import PodcastCard from '../components/PodcastCard'  // Component to display each podcast

export default function Favourites() {
  // ----------------------------
  // Zustand state for favorite IDs
  // ----------------------------
  const { favorites } = useFavorites()

  // ----------------------------
  // Local component state
  // ----------------------------
  const [shows, setShows] = useState([])   // Favorite show objects
  const [loading, setLoading] = useState(true) // Loading indicator

  // ----------------------------
  // Fetch favorite shows whenever the favorites list changes
  // ----------------------------
  useEffect(() => {
    // If no favorites, clear shows and stop loading
    if (favorites.length === 0) {
      setShows([])
      setLoading(false)
      return
    }

    // Fetch all shows from API
    fetchShows().then(allShows => {
      // Filter shows to only those marked as favorites
      const favShows = allShows.filter(s => favorites.includes(s.id))
      setShows(favShows)
      setLoading(false)
    })
  }, [favorites])

  // ----------------------------
  // Render loading or empty states
  // ----------------------------
  if (loading) return <p>Loading favorites...</p>
  if (shows.length === 0) return <p>No favorites yet. Click the heart on any show!</p>

  // ----------------------------
  // Render favorite podcasts grid
  // ----------------------------
  return (
    <div className="podcast-grid">
      {shows.map(show => (
        <PodcastCard key={show.id} podcast={show} />
      ))}
    </div>
  )
}
