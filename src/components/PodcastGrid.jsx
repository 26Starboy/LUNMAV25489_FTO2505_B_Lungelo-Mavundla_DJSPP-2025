// src/components/PodcastGrid.jsx
import PodcastCard from './PodcastCard'

export default function PodcastGrid({ podcasts }) {
  return (
    <div className="podcast-grid">
      {podcasts.map(p => (
        <PodcastCard key={p.id} podcast={p} />
      ))}
    </div>
  )
}