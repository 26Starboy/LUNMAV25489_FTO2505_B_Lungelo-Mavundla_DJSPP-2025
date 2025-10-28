import { usePodcastStore } from '../store/usePodcastStore'

export default function HeartButton({ episode, showTitle, seasonNumber }) {
  const { isFavourite, addFavourite, removeFavourite } = usePodcastStore()
  const fav = isFavourite(episode.id)

  return (
    <button
      onClick={() => fav ? removeFavourite(episode.id) : addFavourite(episode, showTitle, seasonNumber)}
      style={{ background: 'none', border: 'none', fontSize: '1.2rem' }}
    >
      {fav ? 'Filled Heart' : 'Empty Heart'}
    </button>
  )
}