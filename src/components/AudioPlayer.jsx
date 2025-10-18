import { usePlayer } from '../context/PlayerContext'

function AudioPlayer() {
  const { 
    currentEpisode, 
    isPlaying, 
    progress, 
    duration, 
    volume,
    play, 
    pause, 
    seek, 
    setVolume 
  } = usePlayer()

  if (!currentEpisode) {
    return null
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    seek(percent * duration)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (currentEpisode) {
      const audio = document.querySelector('audio')
      if (audio) audio.volume = newVolume
    }
  }

  return (
    <div className="audio-player">
      <div className="player-container">
        <div className="player-info">
          <div className="episode-title">{currentEpisode.title}</div>
          {currentEpisode.show && (
            <div className="show-title">{currentEpisode.show.title}</div>
          )}
        </div>

        <div className="player-controls">
          <button 
            className="play-pause-btn"
            onClick={currentEpisode ? () => (isPlaying ? pause() : play(currentEpisode)) : undefined}
            disabled={!currentEpisode}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <div className="progress-container">
            <span className="time current">{formatTime(progress)}</span>
            <div 
              className="progress-bar"
              onClick={handleProgressClick}
            >
              <div 
                className="progress-fill"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
            <span className="time total">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer