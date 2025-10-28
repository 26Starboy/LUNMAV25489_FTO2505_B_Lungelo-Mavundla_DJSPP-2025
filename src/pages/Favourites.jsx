import { usePodcastStore } from '../store/usePodcastStore'
import { format } from 'date-fns'

export default function Favourites() {
  const { favourites } = usePodcastStore()

  const grouped = favourites.reduce((acc, ep) => {
    const key = ep.showTitle
    if (!acc[key]) acc[key] = []
    acc[key].push(ep)
    return acc
  }, {})

  return (
    <div className="favourites-page">
      <h1>Favourites</h1>
      {Object.entries(grouped).map(([show, eps]) => (
        <div key={show} className="show-group">
          <h2>{show}</h2>
          {eps.sort((a, b) => a.title.localeCompare(b.title)).map(ep => (
            <div key={ep.id}>
              <strong>{ep.title}</strong> (Season {ep.seasonNumber})
              <br />
              <small>Added: {format(new Date(ep.addedAt), 'PPp')}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}