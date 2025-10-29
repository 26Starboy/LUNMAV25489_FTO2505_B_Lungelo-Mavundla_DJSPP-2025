// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { fetchShows } from '../api/client'

// Components
import SearchBar from '../components/SearchBar'
import SortSelect from '../components/SortSelect'
import GenreFilter from '../components/GenreFilter'
import PodcastGrid from '../components/PodcastGrid'
import Loading from '../components/Loading'
import Error from '../components/Error'
import RecommendedCarousel from '../components/RecommendedCarousel'

// Genre data
import { genres } from '../data'

export default function Home() {
  // ----------------------------
  // Local state
  // ----------------------------
  const [podcasts, setPodcasts] = useState([])      // All podcasts from API
  const [filtered, setFiltered] = useState([])      // Filtered podcasts for display
  const [loading, setLoading] = useState(true)      // Loading spinner
  const [error, setError] = useState(null)          // Error messages
  const [search, setSearch] = useState('')          // Search query
  const [sort, setSort] = useState('a-z')          // Sorting option
  const [genre, setGenre] = useState('')           // Selected genre filter

  // ----------------------------
  // Fetch all shows on mount
  // ----------------------------
  useEffect(() => {
    fetchShows()
      .then(data => {
        setPodcasts(data)       // Save all podcasts
        setFiltered(data)       // Initialize filtered list
        setLoading(false)       // Stop loading spinner
      })
      .catch(err => {
        setError(err.message)   // Save error if fetch fails
        setLoading(false)
      })
  }, [])

  // ----------------------------
  // Apply search, genre, and sort filters
  // ----------------------------
  useEffect(() => {
    let result = [...podcasts]

    // Filter by search text
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by genre
    if (genre) {
      const genreObj = genres.find(g => g.title === genre)
      if (genreObj) {
        result = result.filter(p => genreObj.shows.includes(p.id.toString()))
      }
    }

    // Sort podcasts
    if (sort === 'a-z') result.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'z-a') result.sort((a, b) => b.title.localeCompare(a.title))
    if (sort === 'old-new') result.sort((a, b) => new Date(a.updated) - new Date(b.updated))
    if (sort === 'new-old') result.sort((a, b) => new Date(b.updated) - new Date(a.updated))

    setFiltered(result) // Update filtered list
  }, [podcasts, search, sort, genre])

  // ----------------------------
  // Render loading or error states
  // ----------------------------
  if (loading) return <Loading />
  if (error) return <Error message={error} />

  // ----------------------------
  // Render filters and podcast lists
  // ----------------------------
  return (
    <div>
      {/* Filter controls */}
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <SortSelect value={sort} onChange={setSort} />
        <GenreFilter genres={genres} value={genre} onChange={setGenre} />
      </div>

      {/* Recommended carousel showing first 8 filtered podcasts */}
      <RecommendedCarousel podcasts={filtered.slice(0, 8)} />

      {/* Full podcast grid */}
      <PodcastGrid podcasts={filtered} />
    </div>
  )
}
