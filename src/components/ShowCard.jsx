// src/components/ShowCard.jsx
import { Link } from 'react-router-dom'

// Props:
// - podcast: object containing podcast data (id, title, image, genres)
export default function ShowCard({ podcast }) {
  return (
    // ----------------------------
    // Card container for a single podcast/show
    // ----------------------------
    <div className="show-card">
      {/* Podcast cover image */}
      <img src={podcast.image} alt={podcast.title} />

      {/* Podcast title */}
      <h3>{podcast.title}</h3>

      {/* List of genres */}
      <p>{podcast.genres.join(', ')}</p>

      {/* Link to detailed show page */}
      <Link to={`/show/${podcast.id}`}>View Details</Link>
    </div>
  )
}
