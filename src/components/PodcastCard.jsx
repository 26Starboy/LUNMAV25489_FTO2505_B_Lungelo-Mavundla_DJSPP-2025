// src/components/PodcastCard.jsx (SIMPLIFIED – just opens route)
import { Link } from 'react-router-dom'
import { genres } from '../data'

export default function PodcastCard({ podcast }) {
  const genreTitles = podcast.genres
    ?.map(gId => genres.find(g => g.shows.includes(podcast.id))?.title)
    .filter(Boolean)
    .slice(0, 2) || []

  return (
    <Link to={`/show/${podcast.id}`} className="podcast-card">
      <img src={podcast.image} alt={podcast.title} />
      <h3>{podcast.title}</h3>
      <p className="short-desc">
        {podcast.description?.slice(0, 80) || 'No description'}...
      </p>
      <div className="genre-tags">
        {genreTitles.length > 0 ? genreTitles.map((g, i) => (
          <span key={i} className="genre-tag">{g}</span>
        )) : <span className="genre-tag">Uncategorized</span>}
      </div>
      <p className="updated">
        Updated {podcast.updated ? new Date(podcast.updated).toLocaleDateString() : 'Unknown'}
      </p>
    </Link>
  )
}