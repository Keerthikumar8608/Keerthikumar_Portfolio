import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './swiper-carousel.module.css';

interface SwiperCarouselProps {
  images: string[];
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ images }) => {
  return (
    <Swiper 
      spaceBetween={10} 
      slidesPerView={1} 
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className={`h-full ${styles.swiperContainer}`}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg no-select">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                WebkitTouchCallout: 'none',
                KhtmlUserSelect: 'none',
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;