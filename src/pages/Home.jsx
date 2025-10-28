// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { fetchShows } from '../api/client'
import SearchBar from '../components/SearchBar'
import SortSelect from '../components/SortSelect'
import GenreFilter from '../components/GenreFilter'
import PodcastGrid from '../components/PodcastGrid'
import Loading from '../components/Loading'
import Error from '../components/Error'
import RecommendedCarousel from '../components/RecommendedCarousel'
import { genres } from '../data'

export default function Home() {
  const [podcasts, setPodcasts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('a-z')
  const [genre, setGenre] = useState('')

  useEffect(() => {
    fetchShows()
      .then(data => {
        setPodcasts(data)
        setFiltered(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let result = [...podcasts]

    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (genre) {
      const genreObj = genres.find(g => g.title === genre)
      if (genreObj) {
        result = result.filter(p => genreObj.shows.includes(p.id.toString()))
      }
    }

    if (sort === 'a-z') result.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'z-a') result.sort((a, b) => b.title.localeCompare(a.title))
    if (sort === 'old-new') result.sort((a, b) => new Date(a.updated) - new Date(b.updated))
    if (sort === 'new-old') result.sort((a, b) => new Date(b.updated) - new Date(a.updated))

    setFiltered(result)
  }, [podcasts, search, sort, genre])

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div>
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <SortSelect value={sort} onChange={setSort} />
        <GenreFilter genres={genres} value={genre} onChange={setGenre} />
      </div>

      <RecommendedCarousel podcasts={filtered.slice(0, 8)} />
      <PodcastGrid podcasts={filtered} />
    </div>
  )
}