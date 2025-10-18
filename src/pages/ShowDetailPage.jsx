import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiService } from '../services/apiService'
import { usePlayer } from '../context/PlayerContext'
import { useFavorites } from '../context/FavoritesContext'

function ShowDetailPage() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [expandedSeasons, setExpandedSeasons] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { play } = usePlayer()
  const { addFavorite, removeFavorite, isFavorited } = useFavorites()

  // Safe access to GENRE_MAP
  const genreMap = apiService.GENRE_MAP || {}

  useEffect(() => {
    fetchShow()
  }, [id])

  const fetchShow = async () => {
    try {
      setLoading(true)
      const data = await apiService.getShowById(id)
      setShow(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleSeason = (seasonId) => {
    setExpandedSeasons(prev => {
      const newSet = new Set(prev)
      if (newSet.has(seasonId)) {
        newSet.delete(seasonId)
      } else {
        newSet.add(seasonId)
      }
      return newSet
    })
  }

  const toggleFavorite = (episode) => {
    if (isFavorited(episode.id)) {
      removeFavorite(episode.id)
    } else {
      addFavorite(show, episode.season, episode)
    }
  }

  const handlePlayEpisode = (episode, season) => {
    play(episode, show, season)
  }

  if (loading) return <div className="loading">Loading show details...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!show) return <div className="error">Show not found</div>

  return (
    <div className="show-detail-page">
      <Link to="/" className="back-link">← Back to Discover</Link>

      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-image" />
        <div className="show-info">
          <h1>{show.title}</h1>
          <p className="show-description">{show.description}</p>
          <div className="show-meta">
            <div className="genres">
              {show.genres && show.genres.map(genreId => (
                <span key={genreId} className="genre-tag large">
                  {genreMap[genreId] || `Genre ${genreId}`}
                </span>
              ))}
            </div>
            <p className="updated">
              Last updated: {new Date(show.updated).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="seasons-section">
        <h2>Seasons ({show.seasons ? show.seasons.length : 0})</h2>
        {show.seasons && show.seasons.map(season => (
          <div key={season.id} className="season-card">
            <div 
              className="season-header"
              onClick={() => toggleSeason(season.id)}
            >
              <h3>Season {season.number} ({season.episodes ? season.episodes.length : 0} episodes)</h3>
              <span className="toggle-icon">
                {expandedSeasons.has(season.id) ? '▼' : '▶'}
              </span>
            </div>

            {expandedSeasons.has(season.id) && season.episodes && (
              <div className="episodes-list">
                {season.episodes.map(episode => (
                  <div key={episode.id} className="episode-card">
                    <div className="episode-info">
                      <h4>Episode {episode.episodeNumber}: {episode.title}</h4>
                      <p className="episode-description">{episode.description}</p>
                    </div>
                    <div className="episode-actions">
                      <button
                        className="play-btn"
                        onClick={() => handlePlayEpisode(episode, season)}
                      >
                        ▶ Play
                      </button>
                      <button
                        className={`favorite-btn ${isFavorited(episode.id) ? 'favorited' : ''}`}
                        onClick={() => toggleFavorite(episode)}
                      >
                        {isFavorited(episode.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowDetailPage