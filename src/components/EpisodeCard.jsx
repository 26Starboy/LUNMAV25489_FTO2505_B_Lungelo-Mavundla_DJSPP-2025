// src/components/EpisodeCard.jsx
import { usePodcastStore } from '../store/usePodcastStore'
import HeartButton from './HeartButton'

export default function EpisodeCard({ episode, showTitle, seasonNumber }) {
  const { playEpisode, listeningProgress } = usePodcastStore()
  const prog = listeningProgress[episode.id]

  return (
    <div className="episode-card">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      <button onClick={() => playEpisode({ ...episode, showTitle })}>Play</button>
      <HeartButton episode={episode} showTitle={showTitle} seasonNumber={seasonNumber} />
      {prog?.finished && <span> (Finished)</span>}
      {prog && !prog.finished && <span> ({Math.round((prog.progress / prog.duration) * 100)}%)</span>}
    </div>
  )
}