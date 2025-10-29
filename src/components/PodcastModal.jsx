// src/components/PodcastModal.jsx

import { useState } from 'react'
import { genres } from '../data'                 // Static genre data
import EpisodeItem from './EpisodeItem'         // Component for each episode
import { useFavorites } from '../store/useFavorites' // Zustand store for favorites

export default function PodcastModal({ podcast, onClose }) {
  // -----------------------------
  // Local state
  // -----------------------------
  const [selectedSeason, setSelectedSeason] = useState(0)
  
  // Favorites store
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(podcast.id)

  // Ensure seasons is always an array
  const seasons = Array.isArray(podcast.seasons) ? podcast.seasons : []
  const season = seasons[selectedSeason] || { title: 'No Season', episodes: [], image: podcast.image }
  const episodes = Array.isArray(season.episodes) ? season.episodes : []

  // Map genres to titles (safely)
  const genreTitles = podcast.genres
    ?.map(gId => genres.find(g => g.shows.includes(podcast.id))?.title)
    .filter(Boolean) || []

  // Total episodes across all seasons
  const totalEpisodes = seasons.reduce((acc, s) => acc + (s.episodes?.length || 0), 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Prevent clicks on modal content from closing */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        {/* Close & back buttons */}
        <button className="modal-close" onClick={onClose}>×</button>
        <button className="modal-back" onClick={onClose}>Back</button>

        {/* -----------------------------
            Podcast header
        ----------------------------- */}
        <div className="modal-header">
          <img src={podcast.image} alt={podcast.title} className="modal-cover" />
          
          <div className="modal-header-info">
            <div className="modal-title-fav">
              <h1>{podcast.title}</h1>
              
              {/* Favorite toggle */}
              <button
                onClick={() => toggleFavorite(podcast.id)}
                className={`fav-btn ${isFavorite ? 'favorited' : ''}`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '♥' : '♡'}
              </button>
            </div>

            {/* Podcast description */}
            <p className="modal-desc">{podcast.description}</p>

            {/* Metadata: genres, last update, seasons, episodes */}
            <div className="modal-meta">
              <div>
                <strong>Genres:</strong>
                <div className="genre-tags">
                  {genreTitles.length > 0 ? (
                    genreTitles.map((g, i) => (
                      <span key={i} className="genre-tag">{g}</span>
                    ))
                  ) : (
                    <span className="genre-tag">None</span>
                  )}
                </div>
              </div>
              <div><strong>Last Updated:</strong> {new Date(podcast.updated).toLocaleDateString()}</div>
              <div><strong>Seasons:</strong> {seasons.length}</div>
              <div><strong>Episodes:</strong> {totalEpisodes}</div>
            </div>
          </div>
        </div>

        {/* -----------------------------
            Seasons section
        ----------------------------- */}
        <div className="modal-seasons">
          <h2>Seasons</h2>

          {seasons.length > 0 ? (
            <>
              {/* Season selection dropdown */}
              <select
                value={selectedSeason}
                onChange={e => setSelectedSeason(Number(e.target.value))}
                className="season-select"
              >
                {seasons.map((s, i) => (
                  <option key={`season-${podcast.id}-${i}`} value={i}>
                    Season {i + 1}: {s.title}
                  </option>
                ))}
              </select>

              {/* Season info card */}
              <div className="season-card">
                <img src={season.image || podcast.image} alt={season.title} />
                <div>
                  <h3>Season {selectedSeason + 1}: {season.title}</h3>
                  <p>{season.description || 'No description available.'}</p>
                  <p><strong>{episodes.length} Episodes</strong></p>
                </div>
              </div>

              {/* Episode list */}
              <div className="episode-list">
                {episodes.length > 0 ? (
                  episodes.map((ep, i) => {
                    // Unique key for React mapping
                    const uniqueKey = ep.id
                      ? `episode-${ep.id}`
                      : `episode-${podcast.id}-s${selectedSeason}-e${i}`

                    return (
                      <EpisodeItem
                        key={uniqueKey}
                        episode={ep}
                        show={podcast}
                        seasonIndex={i}
                      />
                    )
                  })
                ) : (
                  <p>No episodes in this season.</p>
                )}
              </div>
            </>
          ) : (
            <p>No seasons available for this podcast.</p>
          )}
        </div>
      </div>
    </div>
  )
}
