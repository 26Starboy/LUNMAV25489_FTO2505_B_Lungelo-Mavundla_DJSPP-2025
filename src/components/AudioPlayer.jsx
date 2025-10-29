// src/components/AudioPlayer.jsx
// Simple audio player UI that uses the global podcast store

import { usePodcastStore } from '../store/usePodcastStore'

export default function AudioPlayer() {
  // Access global podcast playback state and actions
  const { currentEpisode, isPlaying, progress, duration, pause, resume, seek } = usePodcastStore()

  // Don't render player if no episode is selected
  if (!currentEpisode) return null

  return (
    <div className="audio-player">
      {/* Display episode title and show */}
      <div className="audio-info">
        <strong>{currentEpisode.title}</strong>
        <div>{currentEpisode.showTitle}</div>
      </div>

      {/* Playback controls */}
      <div className="audio-controls">
        {/* Play/Pause button */}
        <button onClick={isPlaying ? pause : resume}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Progress bar: clicking updates the current time */}
        <div
          className="progress-bar"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = (e.clientX - rect.left) / rect.width
            seek(ratio * duration)
          }}
        >
          {/* Progress fill based on current playback */}
          <div
            className="progress-fill"
            style={{ width: `${(progress / duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
