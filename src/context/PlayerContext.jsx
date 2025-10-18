import React, { createContext, useContext, useRef, useState, useEffect } from 'react'

const PlayerContext = createContext()

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [currentEpisode, setCurrentEpisode] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const savedProgress = localStorage.getItem('audioProgress')
    if (savedProgress && audioRef.current) {
      const { episodeId, progress: savedProgressValue } = JSON.parse(savedProgress)
      if (currentEpisode && currentEpisode.id === episodeId) {
        audioRef.current.currentTime = savedProgressValue
      }
    }
  }, [currentEpisode])

  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      const saveProgress = () => {
        localStorage.setItem('audioProgress', JSON.stringify({
          episodeId: currentEpisode.id,
          progress: audioRef.current.currentTime,
          timestamp: Date.now()
        }))
      }

      const interval = setInterval(saveProgress, 5000)
      return () => clearInterval(interval)
    }
  }, [currentEpisode])

  const play = (episode, show = null, season = null) => {
    const episodeData = {
      ...episode,
      show: show || episode.show,
      season: season || episode.season
    }

    if (currentEpisode && currentEpisode.id === episode.id) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    } else {
      setCurrentEpisode(episodeData)
      audioRef.current.src = episode.audio || 'https://podcast-api.netlify.app/placeholder-audio.mp3'
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pause = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime)
    setDuration(audioRef.current.duration)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    if (currentEpisode) {
      const finishedEpisodes = JSON.parse(localStorage.getItem('finishedEpisodes') || '[]')
      if (!finishedEpisodes.includes(currentEpisode.id)) {
        localStorage.setItem('finishedEpisodes', JSON.stringify([...finishedEpisodes, currentEpisode.id]))
      }
    }
  }

  const value = {
    currentEpisode,
    isPlaying,
    progress,
    duration,
    volume,
    play,
    pause,
    seek,
    setVolume
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </PlayerContext.Provider>
  )
}