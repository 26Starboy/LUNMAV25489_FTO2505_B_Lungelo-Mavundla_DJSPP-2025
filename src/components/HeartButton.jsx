// src/components/HeartButton.jsx
// Button to toggle favorite status for an episode

import { usePodcastStore } from '../store/usePodcastStore'

export default function HeartButton({ episode, showTitle, seasonNumber }) {
  const { isFavourite, addFavourite, removeFavourite } = usePodcastStore()

  // Check if this episode is already a favorite
  const fav = isFavourite(episode.id)

  return (
    <button
      onClick={() =>
        fav
          ? removeFavourite(episode.id)            // Remove from favorites if already added
          : addFavourite(episode, showTitle, seasonNumber) // Add to favorites otherwise
      }
      style={{ background: 'none', border: 'none', fontSize: '1.2rem' }} // Minimal styling
    >
      {fav ? 'Filled Heart' : 'Empty Heart'} // Visual feedback
    </button>
  )
}
