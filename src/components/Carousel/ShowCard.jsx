import { apiService, GENRE_MAP } from '../../services/apiService'

function ShowCard({ show, onShowClick, onToggleFavorite, isFavorited }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    onToggleFavorite(show)
  }

  return (
    <div className="show-card" onClick={() => onShowClick(show.id)}>
      <img 
        src={show.image} 
        alt={show.title}
        className="show-image"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop'
        }}
      />
      <div className="card-content">
        <h3>{show.title}</h3>
        <p className="description">
          {show.description && show.description.length > 120 
            ? `${show.description.substring(0, 120)}...` 
            : show.description || 'No description available.'
          }
        </p>
        <div className="genres">
          {show.genres && show.genres.slice(0, 3).map(genreId => (
            <span key={genreId} className="genre-tag">
              {GENRE_MAP && GENRE_MAP[genreId] ? GENRE_MAP[genreId] : `Genre ${genreId}`}
            </span>
          ))}
          {show.genres && show.genres.length > 3 && (
            <span className="genre-tag">+{show.genres.length - 3}</span>
          )}
        </div>
        <div className="card-footer">
          <p className="updated">
            📅 {show.updated ? new Date(show.updated).toLocaleDateString() : 'Recently'}
          </p>
          <button 
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorited ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowCard