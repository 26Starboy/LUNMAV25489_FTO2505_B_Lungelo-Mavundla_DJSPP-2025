// src/components/EpisodeItem.jsx
// Component for displaying a single episode with play/pause functionality and progress tracking

import { usePlayerStore } from '../store/usePlayerStore'

export default function EpisodeItem({ episode, show, seasonIndex }) {
  const { currentEpisode, isPlaying, play, pause, resume, getProgress } = usePlayerStore()

  // Generate a unique ID if episode doesn't have one
  const episodeId = episode.id || `temp-${seasonIndex}`

  // Retrieve saved progress for this episode
  const progress = getProgress(episodeId)

  // Determine if this episode is currently playing
  const isCurrent = currentEpisode?.id === episodeId
  const isEpisodePlaying = isCurrent && isPlaying

  return (
    <div className="episode-item">
      {/* Show podcast/season image */}
      <img src={show.image} alt={episode.title} />

      <div className="episode-info">
        {/* Episode title */}
        <p className="episode-title">
          Episode {seasonIndex + 1}: {episode.title}
        </p>

        {/* Episode description */}
        <p className="episode-desc">{episode.description}</p>

        {/* Play/Pause button */}
        <button
          className="play-btn"
          onClick={() => {
            if (isCurrent && isPlaying) {
              pause()          // Pause if currently playing
            } else if (isCurrent) {
              resume()         // Resume if paused
            } else {
              play(episode, show) // Start new episode
            }
          }}
        >
          {isEpisodePlaying ? 'Pause' : 'Play'}
        </button>

        {/* Show progress if user has already listened partially */}
        {progress > 0 && (
          <small className="progress-text">
            Resume from {Math.floor(progress / 60)}:{(progress % 60).toFixed(0).padStart(2, '0')}
          </small>
        )}
      </div>
    </div>
  )
}
