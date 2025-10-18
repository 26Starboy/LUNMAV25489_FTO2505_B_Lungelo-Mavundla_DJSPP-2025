import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { apiService, GENRE_MAP } from '../services/apiService'

function RecommendedCarousel({ shows }) {
  const carouselRef = useRef(null)

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (!shows || shows.length === 0) return null

  return (
    <section className="recommended-shows">
      <div className="section-header">
        <h2>Recommended Shows</h2>
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={() => scroll('left')}>
            ‹
          </button>
          <button className="carousel-btn" onClick={() => scroll('right')}>
            ›
          </button>
        </div>
      </div>

      <div className="carousel" ref={carouselRef}>
        {shows.map(show => (
          <Link key={show.id} to={`/show/${show.id}`} className="carousel-item">
            <img 
              src={show.image} 
              alt={show.title}
              className="carousel-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop'
              }}
            />
            <div className="carousel-content">
              <h3>{show.title}</h3>
              <div className="carousel-meta">
                <div className="carousel-genres">
                  {show.genres && show.genres.slice(0, 2).map(genreId => (
                    <span key={genreId} className="genre-tag">
                      {GENRE_MAP && GENRE_MAP[genreId] ? GENRE_MAP[genreId] : `Genre ${genreId}`}
                    </span>
                  ))}
                </div>
                <div className="carousel-updated">
                  📅 Updated {show.updated ? new Date(show.updated).toLocaleDateString() : 'Recently'}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RecommendedCarousel