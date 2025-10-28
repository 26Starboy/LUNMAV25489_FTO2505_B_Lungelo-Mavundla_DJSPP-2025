// src/components/GlobalPlayer.jsx
import { usePlayerStore } from '../store/usePlayerStore'

export default function GlobalPlayer() {
  const { currentEpisode, isPlaying, progress, duration, pause, resume, seek, clear } = usePlayerStore()

  if (!currentEpisode) return null

  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = Math.floor(s % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="global-player">
      <img src={currentEpisode.showImage} alt="" />
      <div className="player-info">
        <strong>{currentEpisode.title}</strong>
        <small>{currentEpisode.showTitle}</small>
      </div>

      <div className="player-controls">
        <button onClick={isPlaying ? pause : resume}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <div
          className="progress-bar"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = (e.clientX - rect.left) / rect.width
            seek(ratio * duration)
          }}
        >
          <div
            className="progress-fill"
            style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
          />
        </div>

        <span className="time">
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>

      <button className="close-player" onClick={clear}>×</button>
    </div>
  )
}