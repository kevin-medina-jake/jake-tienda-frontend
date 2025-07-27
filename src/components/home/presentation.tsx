"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/home/presentation.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ICarouselPresentation, IPresentation } from "@/types/home";

export const Presentation = ({ presentations }: any) => {
  const listPresentation: ICarouselPresentation[] = presentations;

  return (
    <Swiper
      spaceBetween={0}
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
      {listPresentation.map((presentation: ICarouselPresentation) => (
        <SwiperSlide key={presentation.id}>
          <img src={presentation.url} alt="Slide 1" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
