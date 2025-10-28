import { usePodcastStore } from '../store/usePodcastStore'

export default function AudioPlayer() {
  const { currentEpisode, isPlaying, progress, duration, pause, resume, seek } = usePodcastStore()
  if (!currentEpisode) return null

  return (
    <div className="audio-player">
      <div className="audio-info">
        <strong>{currentEpisode.title}</strong>
        <div>{currentEpisode.showTitle}</div>
      </div>
      <div className="audio-controls">
        <button onClick={isPlaying ? pause : resume}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div
          className="progress-bar"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = (e.clientX - rect.left) / rect.width
            seek(ratio * duration)
          }}
        >
          <div className="progress-fill" style={{ width: `${(progress / duration) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}