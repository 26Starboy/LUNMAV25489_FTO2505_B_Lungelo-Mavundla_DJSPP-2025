// src/components/PodcastGrid.jsx

import PodcastCard from './PodcastCard' // Component for rendering a single podcast card

export default function PodcastGrid({ podcasts }) {
  // -----------------------------
  // Props:
  // - podcasts: an array of podcast objects to display
  // -----------------------------
  return (
    // Container for all podcast cards, can be styled as grid or flex
    <div className="podcast-grid">
      {podcasts.map(p => (
        // Render one PodcastCard per podcast
        // The key ensures React efficiently updates the list
        <PodcastCard key={p.id} podcast={p} />
      ))}
    </div>
  )
}
