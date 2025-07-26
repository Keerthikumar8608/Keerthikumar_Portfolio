import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface RoboticArmCarouselProps {
  images: string[];
  height?: string;
}

const RoboticArmCarousel: React.FC<RoboticArmCarouselProps> = ({ 
  images, 
  height = "300px" 
}) => {
  return (
    <div className="w-full h-full relative">
      <style jsx global>{`
        .robotic-arm-swiper .swiper-button-next,
        .robotic-arm-swiper .swiper-button-prev {
          width: 30px !important;
          height: 30px !important;
          background: white !important;
          border-radius: 50% !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid #e5e7eb !important;
        }
        
        .robotic-arm-swiper .swiper-button-next:after,
        .robotic-arm-swiper .swiper-button-prev:after {
          font-size: 12px !important;
          font-weight: bold !important;
          color: #374151 !important;
        }
        
        .robotic-arm-swiper .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: #000000 !important;
          opacity: 0.5 !important;
        }
        
        .robotic-arm-swiper .swiper-pagination-bullet-active {
          background: #ffffff !important;
          opacity: 1 !important;
          border: 2px solid #000000 !important;
        }
      `}</style>
      <Swiper 
        spaceBetween={0} 
        slidesPerView={1} 
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-full robotic-arm-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ height: height }}
            >
              <img
                src={image}
                alt={`Robotic Arm ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoboticArmCarousel;
