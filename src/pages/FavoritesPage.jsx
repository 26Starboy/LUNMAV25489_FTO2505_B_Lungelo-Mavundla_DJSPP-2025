import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { usePlayer } from '../context/PlayerContext'
import { apiService, GENRE_MAP } from '../services/apiService'

function FavoritesPage() {
  const { getFavoriteShows, removeFavorite } = useFavorites()
  const { play } = usePlayer()
  const [sortBy, setSortBy] = useState('dateAdded')
  const [sortOrder, setSortOrder] = useState('desc')

  const favoriteShows = getFavoriteShows()

  const sortedShows = favoriteShows.map(show => ({
    ...show,
    episodes: show.episodes.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      } else {
        return sortOrder === 'asc'
          ? new Date(a.addedAt) - new Date(b.addedAt)
          : new Date(b.addedAt) - new Date(a.addedAt)
      }
    })
  }))

  const handlePlayEpisode = (episode, show, season) => {
    play(episode, show, season)
  }

  if (favoriteShows.length === 0) {
    return (
      <div className="favorites-page">
        <div className="empty-favorites">
          <h2>No favorites yet</h2>
          <p>Start exploring podcasts and add your favorite episodes!</p>
          <Link to="/" className="cta-button">Discover Podcasts</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Your Favorites</h1>
        <p>All your saved episodes in one place</p>
        
        <div className="sort-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="dateAdded">Date Added</option>
            <option value="title">Episode Title</option>
          </select>
          
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-order"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="favorites-list">
        {sortedShows.map(show => (
          <div key={show.id} className="favorite-show-group">
            <div className="show-group-header">
              <Link to={`/show/${show.id}`} className="show-title-link">
                <img 
                  src={show.image} 
                  alt={show.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop'
                  }}
                />
                <div>
                  <h2>{show.title}</h2>
                  <div className="genres">
                    {show.genres && show.genres.map(genreId => (
                      <span key={genreId} className="genre-tag">
                        {GENRE_MAP && GENRE_MAP[genreId] ? GENRE_MAP[genreId] : `Genre ${genreId}`}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>

            <div className="favorite-episodes">
              {show.episodes && show.episodes.map(episode => (
                <div key={episode.id} className="favorite-episode">
                  <div className="episode-details">
                    <h4>
                      {episode.season && episode.season.number ? `Season ${episode.season.number}, ` : ''}
                      Episode {episode.episodeNumber}: {episode.title}
                    </h4>
                    <p className="episode-description">
                      {episode.description || 'No description available.'}
                    </p>
                    <p className="added-date">
                      ⭐ Added: {episode.addedAt ? new Date(episode.addedAt).toLocaleString() : 'Unknown date'}
                    </p>
                  </div>
                  
                  <div className="episode-actions">
                    <button
                      className="play-btn"
                      onClick={() => handlePlayEpisode(episode, show, episode.season)}
                    >
                      ▶ Play
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFavorite(episode.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage