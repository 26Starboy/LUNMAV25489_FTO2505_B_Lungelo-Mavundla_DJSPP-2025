// src/components/PodcastModal.jsx
import { useState } from 'react'
import { genres } from '../data'
import EpisodeItem from './EpisodeItem'

const PLACEHOLDER_AUDIO = 'https://podcast-api.netlify.app/placeholder-audio.mp3'

export default function PodcastModal({ podcast, onClose }) {
  const [selectedSeason, setSelectedSeason] = useState(0)

  // SAFEGUARD: Ensure data exists
  const seasons = Array.isArray(podcast.seasons) ? podcast.seasons : []
  const season = seasons[selectedSeason] || { title: 'No Season', episodes: [], image: podcast.image }
  const episodes = Array.isArray(season.episodes) ? season.episodes : []

  // GENRES: Map using `data.js`
  const genreTitles = podcast.genres
    ?.map(gId => genres.find(g => g.shows.includes(podcast.id))?.title)
    .filter(Boolean) || []

  const totalEpisodes = seasons.reduce((acc, s) => acc + (s.episodes?.length || 0), 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Buttons */}
        <button className="modal-close" onClick={onClose}>×</button>
        <button className="modal-back" onClick={onClose}>Back</button>

        {/* Header */}
        <div className="modal-header">
          <img src={podcast.image} alt={podcast.title} className="modal-cover" />
          <div>
            <h1>{podcast.title}</h1>
            <p className="modal-desc">{podcast.description}</p>

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
              <div>
                <strong>Last Updated:</strong> {new Date(podcast.updated).toLocaleDateString()}
              </div>
              <div>
                <strong>Seasons:</strong> {seasons.length}
              </div>
              <div>
                <strong>Episodes:</strong> {totalEpisodes}
              </div>
            </div>
          </div>
        </div>

        {/* Seasons */}
        <div className="modal-seasons">
          <h2>Seasons</h2>

          {seasons.length > 0 ? (
            <>
              <select
                value={selectedSeason}
                onChange={e => setSelectedSeason(Number(e.target.value))}
                className="season-select"
              >
                {seasons.map((s, i) => (
                  <option key={i} value={i}>
                    Season {i + 1}: {s.title}
                  </option>
                ))}
              </select>

              <div className="season-card">
                <img src={season.image || podcast.image} alt={season.title} />
                <div>
                  <h3>Season {selectedSeason + 1}: {season.title}</h3>
                  <p>{season.description || 'No description available.'}</p>
                  <p><strong>{episodes.length} Episodes</strong></p>
                </div>
              </div>

              <div className="episode-list">
                {episodes.length > 0 ? (
                  episodes.map((ep, i) => (
                    <EpisodeItem
                      key={ep.id}
                      episode={ep}
                      show={podcast}
                      seasonIndex={i}
                    />
                  ))
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