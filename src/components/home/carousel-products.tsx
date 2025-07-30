"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/home/carrousel-products.css";

// import required modules
import { Pagination } from "swiper/modules";
import { INewProducts } from "@/types/product";
import { CartProduct } from "../common/CartProduct";

export const CarouselProducts = ({
  products,
}: {
  products: INewProducts[];
}) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={4}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 4,
          },
        }}
        modules={[Pagination]}
        loop={true}
        className="h-auto !pb-10"
      >
        {products.slice(0, 8).map((product) => (
          <SwiperSlide key={product.id}>
            <CartProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
