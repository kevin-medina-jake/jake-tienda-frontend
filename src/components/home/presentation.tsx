"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Carrousel from "@/assets/home/carrousel/image copy 2.png";
import "@/styles/home/presentation.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export const Presentation = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[calc(100vh-250px)]"
      >
        <SwiperSlide>
          <img
            src={Carrousel.src}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Carrousel.src}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Carrousel.src}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Carrousel.src}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Carrousel.src}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
