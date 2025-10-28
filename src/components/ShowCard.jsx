import { Link } from 'react-router-dom'

export default function ShowCard({ podcast }) {
  return (
    <div className="show-card">
      <img src={podcast.image} alt={podcast.title} />
      <h3>{podcast.title}</h3>
      <p>{podcast.genres.join(', ')}</p>
      <Link to={`/show/${podcast.id}`}>View Details</Link>
    </div>
  )
}