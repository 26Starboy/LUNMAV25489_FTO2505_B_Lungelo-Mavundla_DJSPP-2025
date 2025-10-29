// src/components/EpisodeCard.jsx
// Displays a single episode with play button, favorite (heart) toggle, and listening progress

import { usePodcastStore } from '../store/usePodcastStore'
import HeartButton from './HeartButton'

export default function EpisodeCard({ episode, showTitle, seasonNumber }) {
  const { playEpisode, listeningProgress } = usePodcastStore()

  // Get saved progress for this episode
  const prog = listeningProgress[episode.id]

  return (
    <div className="episode-card">
      {/* Episode title and description */}
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>

      {/* Play episode button */}
      <button onClick={() => playEpisode({ ...episode, showTitle })}>
        Play
      </button>

      {/* Heart button for adding/removing favorites */}
      <HeartButton
        episode={episode}
        showTitle={showTitle}
        seasonNumber={seasonNumber}
      />

      {/* Display finished status or progress percentage */}
      {prog?.finished && <span> (Finished)</span>}
      {prog && !prog.finished && (
        <span> ({Math.round((prog.progress / prog.duration) * 100)}%)</span>
      )}
    </div>
  )
}
