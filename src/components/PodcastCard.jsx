// src/components/PodcastCard.jsx
// This component renders a simplified card for each podcast, linking to its detail page

import { Link } from 'react-router-dom' // For client-side navigation
import { genres } from '../data'       // Genre data to match podcast genre IDs

export default function PodcastCard({ podcast }) {
  // Extract up to 2 genre titles for display
  const genreTitles = podcast.genres
    ?.map(gId => genres.find(g => g.shows.includes(podcast.id))?.title)
    .filter(Boolean)          // Remove null/undefined values
    .slice(0, 2) || []        // Only show 2 genres max

  return (
    // Clicking the card navigates to the show detail page
    <Link to={`/show/${podcast.id}`} className="podcast-card">
      {/* Podcast cover image */}
      <img src={podcast.image} alt={podcast.title} />

      {/* Podcast title */}
      <h3>{podcast.title}</h3>

      {/* Short description snippet */}
      <p className="short-desc">
        {podcast.description?.slice(0, 80) || 'No description'}...
      </p>

      {/* Display genres as tags */}
      <div className="genre-tags">
        {genreTitles.length > 0
          ? genreTitles.map((g, i) => (
              <span key={i} className="genre-tag">{g}</span>
            ))
          : <span className="genre-tag">Uncategorized</span>}
      </div>

      {/* Last updated date */}
      <p className="updated">
        Updated {podcast.updated ? new Date(podcast.updated).toLocaleDateString() : 'Unknown'}
      </p>
    </Link>
  )
}
