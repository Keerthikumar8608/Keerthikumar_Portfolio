import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface HeroBannerCarouselProps {
  images: string[];
}

const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({ images }) => {
  return (
    <Swiper 
      spaceBetween={0} 
      slidesPerView={1} 
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={false}
      pagination={false}
      modules={[Autoplay]}
      className="h-[40vh] md:h-[45vh] w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-full relative">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroBannerCarousel;
