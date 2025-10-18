import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiService, GENRE_MAP } from '../services/apiService'
import ShowCard from '../components/Carousel/ShowCard'
import RecommendedCarousel from '../components/RecommendedCarousel'
import Modal from '../components/ui/Modal'
import { usePlayer } from '../context/PlayerContext'
import { useFavorites } from '../context/FavoritesContext'

function LandingPage() {
  const [podcasts, setPodcasts] = useState([])
  const [filteredPodcasts, setFilteredPodcasts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedShow, setSelectedShow] = useState(null)
  const [expandedSeasons, setExpandedSeasons] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  const { play } = usePlayer()
  const { addFavorite, removeFavorite, isFavorited } = useFavorites()

  useEffect(() => {
    fetchPodcasts()
  }, [])

  useEffect(() => {
    filterPodcasts()
  }, [podcasts, searchTerm, selectedGenre])

  const fetchPodcasts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getAllPodcasts()
      setPodcasts(data)
      
      // Check if we're using fallback data by comparing with known fallback structure
      if (data && data[0] && data[0].id === '1') {
        setUsingFallback(true)
      }
    } catch (err) {
      setError(err.message)
      setUsingFallback(true)
      // Use fallback data directly
      const fallbackData = await apiService.getAllPodcasts()
      setPodcasts(fallbackData)
    } finally {
      setLoading(false)
    }
  }

  const filterPodcasts = () => {
    let filtered = podcasts

    if (searchTerm) {
      filtered = filtered.filter(podcast =>
        podcast.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedGenre) {
      filtered = filtered.filter(podcast =>
        podcast.genres?.includes(parseInt(selectedGenre))
      )
    }

    setFilteredPodcasts(filtered)
    setCurrentPage(1)
  }

  const getCurrentPodcasts = () => {
    const startIndex = (currentPage - 1) * 8
    return filteredPodcasts.slice(startIndex, startIndex + 8)
  }

  const totalPages = Math.min(8, Math.ceil(filteredPodcasts.length / 8))

  const handleShowClick = async (showId) => {
    try {
      const show = await apiService.getShowById(showId)
      setSelectedShow(show)
      // Expand first season by default
      if (show.seasons && show.seasons.length > 0) {
        setExpandedSeasons(new Set([show.seasons[0].id || show.seasons[0].number]))
      }
    } catch (err) {
      console.error('Failed to load show details:', err)
      // Try to find show in current podcasts
      const localShow = podcasts.find(p => p.id === showId)
      if (localShow) {
        setSelectedShow(localShow)
      }
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

  const handlePlayEpisode = (episode, season) => {
    play(episode, selectedShow, season)
  }

  const toggleEpisodeFavorite = (episode, season) => {
    if (isFavorited(episode.id)) {
      removeFavorite(episode.id)
    } else {
      // Ensure we have proper season data
      const seasonData = season ? {
        id: season.id || season.number,
        number: season.number || 1
      } : null
      
      addFavorite(selectedShow, seasonData, episode)
    }
  }

  const toggleShowFavorite = (show) => {
    if (isFavorited(show.id)) {
      removeFavorite(show.id)
    } else {
      addFavorite(show)
    }
  }

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    fetchPodcasts()
  }

  if (loading) {
    return (
      <div className="landing-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing podcasts...</p>
        </div>
      </div>
    )
  }

  if (error && podcasts.length === 0) {
    return (
      <div className="landing-page">
        <div className="error-container">
          <h2>Unable to load podcasts</h2>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="landing-page">
      {usingFallback && (
        <div className="fallback-warning">
          <p>⚠️ Using demo data - API is currently unavailable</p>
          <button onClick={handleRetry} className="retry-btn small">
            Retry Connection
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Podcast</h1>
          <p>Explore thousands of podcasts across all genres. Find your perfect audio companion.</p>
          <div className="hero-stats">
            <span className="stat">{podcasts.length}+ Shows</span>
            <span className="stat">10+ Genres</span>
            <span className="stat">Always Free</span>
          </div>
        </div>
      </section>

      {/* Recommended Shows Carousel */}
      {podcasts.length > 0 && (
        <RecommendedCarousel shows={podcasts.slice(0, 8)} />
      )}

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-header">
          <h2>Browse All Podcasts</h2>
          <p>Find exactly what you're looking for</p>
        </div>
        
        <div className="filters-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search podcasts by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-filter"
          >
            <option value="">All Genres</option>
            {GENRE_MAP && Object.entries(GENRE_MAP).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {(searchTerm || selectedGenre) && (
            <button 
              className="clear-filters"
              onClick={() => {
                setSearchTerm('')
                setSelectedGenre('')
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="results-info">
          <p>
            Showing {filteredPodcasts.length} of {podcasts.length} podcasts
            {searchTerm && ` for "${searchTerm}"`}
            {selectedGenre && GENRE_MAP && ` in ${GENRE_MAP[selectedGenre]}`}
          </p>
        </div>
      </section>

      {/* Podcast Grid */}
      <section className="podcasts-section">
        {filteredPodcasts.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🎧</div>
            <h3>No podcasts found</h3>
            <p>Try adjusting your search or filter criteria</p>
            {(searchTerm || selectedGenre) && (
              <button 
                className="clear-filters large"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedGenre('')
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="podcast-grid">
              {getCurrentPodcasts().map(podcast => (
                <ShowCard 
                  key={podcast.id}
                  show={podcast}
                  onShowClick={handleShowClick}
                  onToggleFavorite={() => toggleShowFavorite(podcast)}
                  isFavorited={isFavorited(podcast.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Show Detail Modal */}
      {selectedShow && (
        <Modal onClose={() => setSelectedShow(null)} size="xlarge">
          <div className="show-detail-modal">
            {/* Modal Header */}
            <div className="modal-header">
              <img 
                src={selectedShow.image} 
                alt={selectedShow.title} 
                className="modal-image" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop'
                }}
              />
              <div className="modal-header-info">
                <h2>{selectedShow.title}</h2>
                <p className="modal-description">{selectedShow.description}</p>
                
                <div className="modal-meta">
                  <div className="genres">
                    {selectedShow.genres && selectedShow.genres.map(genreId => (
                      <span key={genreId} className="genre-tag large">
                        {GENRE_MAP && GENRE_MAP[genreId] ? GENRE_MAP[genreId] : `Genre ${genreId}`}
                      </span>
                    ))}
                  </div>
                  <p className="updated">
                    📅 Updated: {new Date(selectedShow.updated).toLocaleDateString()}
                  </p>
                </div>

                <div className="modal-actions">
                  <button 
                    className={`favorite-btn large ${isFavorited(selectedShow.id) ? 'favorited' : ''}`}
                    onClick={() => toggleShowFavorite(selectedShow)}
                  >
                    {isFavorited(selectedShow.id) ? '❤️ Favorite Show' : '🤍 Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>

            {/* Seasons Section */}
            <div className="seasons-section">
              <h3>Seasons ({selectedShow.seasons ? selectedShow.seasons.length : 0})</h3>
              
              {selectedShow.seasons && selectedShow.seasons.length > 0 ? (
                selectedShow.seasons.map(season => (
                  <div key={season.id || season.number} className="season-card">
                    <div 
                      className="season-header"
                      onClick={() => toggleSeason(season.id || season.number)}
                    >
                      <h4>
                        <span className="season-number">Season {season.number}</span>
                        <span className="episode-count">({season.episodes ? season.episodes.length : 0} episodes)</span>
                      </h4>
                      <span className="toggle-icon">
                        {expandedSeasons.has(season.id || season.number) ? '▼' : '▶'}
                      </span>
                    </div>

                    {expandedSeasons.has(season.id || season.number) && season.episodes && (
                      <div className="episodes-list">
                        {season.episodes.map(episode => (
                          <div key={episode.id} className="episode-card">
                            <div className="episode-info">
                              <h5>
                                Episode {episode.episodeNumber}: {episode.title}
                              </h5>
                              <div className="episode-meta">
                                <span>Season {season.number}</span>
                                <span>•</span>
                                <span>Episode {episode.episodeNumber}</span>
                              </div>
                              <p className="episode-description">
                                {episode.description || 'No description available.'}
                              </p>
                            </div>
                            <div className="episode-actions">
                              <button
                                className="play-btn"
                                onClick={() => handlePlayEpisode(episode, season)}
                                title="Play episode"
                              >
                                ▶ Play
                              </button>
                              <button
                                className={`favorite-btn ${isFavorited(episode.id) ? 'favorited' : ''}`}
                                onClick={() => toggleEpisodeFavorite(episode, season)}
                                title={isFavorited(episode.id) ? 'Remove from favorites' : 'Add to favorites'}
                              >
                                {isFavorited(episode.id) ? '❤️' : '🤍'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-seasons">
                  <p>No seasons available for this show.</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default LandingPage