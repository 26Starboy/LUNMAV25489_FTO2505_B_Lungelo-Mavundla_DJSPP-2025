// src/components/GlobalPlayer.jsx
// Persistent audio player that appears when an episode is playing

import { usePlayerStore } from '../store/usePlayerStore'

export default function GlobalPlayer() {
  // Extract audio state and controls from the global store
  const { currentEpisode, isPlaying, progress, duration, pause, resume, seek, clear } = usePlayerStore()

  // Do not render the player if no episode is selected
  if (!currentEpisode) return null

  // Helper function to format time in mm:ss
  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = Math.floor(s % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="global-player">
      {/* Episode cover */}
      <img src={currentEpisode.showImage} alt="" />

      {/* Episode info */}
      <div className="player-info">
        <strong>{currentEpisode.title}</strong>
        <small>{currentEpisode.showTitle}</small>
      </div>

      {/* Player controls */}
      <div className="player-controls">
        {/* Play/Pause toggle */}
        <button onClick={isPlaying ? pause : resume}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Clickable progress bar */}
        <div
          className="progress-bar"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = (e.clientX - rect.left) / rect.width
            seek(ratio * duration)
          }}
        >
          {/* Filled portion of the progress bar */}
          <div
            className="progress-fill"
            style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
          />
        </div>

        {/* Time display */}
        <span className="time">
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>

      {/* Close player button */}
      <button className="close-player" onClick={clear}>×</button>
    </div>
  )
}
