// src/components/RecommendedCarousel.jsx

// Dependencies:
// - Swiper: Carousel/slider component
// - SwiperSlide: Each slide
// - Navigation, Autoplay: Swiper modules for nav buttons & autoplay
// - react-router-dom Link: Navigate to show details

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'

// Props:
// - podcasts: array of podcast objects to display
export default function RecommendedCarousel({ podcasts }) {
  return (
    <div className="swiper-container">
      {/* ----------------------------
          Swiper carousel setup
      ---------------------------- */}
      <Swiper
        modules={[Navigation, Autoplay]}      // Enable navigation buttons and autoplay
        spaceBetween={20}                     // Space between slides
        slidesPerView={1.5}                   // Default slides visible
        navigation                            // Show navigation arrows
        loop                                  // Loop slides infinitely
        autoplay={{ delay: 4000 }}            // Autoplay delay
        breakpoints={{                         // Responsive slides
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 }
        }}
      >
        {/* ----------------------------
            Map each podcast to a slide
        ---------------------------- */}
        {podcasts.map(p => (
          <SwiperSlide key={p.id}>
            <Link to={`/show/${p.id}`}>    {/* Navigate to show detail page */}
              <img src={p.image} alt={p.title} /> {/* Podcast cover image */}
              <h3>{p.title}</h3>                   {/* Podcast title */}
              <p>{p.genres.join(', ')}</p>         {/* Podcast genres */}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
