// src/components/EpisodeItem.jsx
import { usePlayerStore } from '../store/usePlayerStore'

export default function EpisodeItem({ episode, show, seasonIndex }) {
  const { currentEpisode, isPlaying, play, pause, resume, getProgress } = usePlayerStore()

  const episodeId = episode.id || `temp-${seasonIndex}`
  const progress = getProgress(episodeId)
  const isCurrent = currentEpisode?.id === episodeId
  const isEpisodePlaying = isCurrent && isPlaying

  return (
    <div className="episode-item">
      <img src={show.image} alt={episode.title} />
      <div className="episode-info">
        <p className="episode-title">
          Episode {seasonIndex + 1}: {episode.title}
        </p>
        <p className="episode-desc">{episode.description}</p>

        <button
          className="play-btn"
          onClick={() => {
            if (isCurrent && isPlaying) {
              pause()
            } else if (isCurrent) {
              resume()
            } else {
              play(episode, show)
            }
          }}
        >
          {isEpisodePlaying ? 'Pause' : 'Play'}
        </button>

        {progress > 0 && (
          <small className="progress-text">
            Resume from {Math.floor(progress / 60)}:{(progress % 60).toFixed(0).padStart(2, '0')}
          </small>
        )}
      </div>
    </div>
  )
}