import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'

export default function RecommendedCarousel({ podcasts }) {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.5}
        navigation
        loop
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 }
        }}
      >
        {podcasts.map(p => (
          <SwiperSlide key={p.id}>
            <Link to={`/show/${p.id}`}>
              <img src={p.image} alt={p.title} />
              <h3>{p.title}</h3>
              <p>{p.genres.join(', ')}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}