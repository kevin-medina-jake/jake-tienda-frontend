"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/home/carrousel-products.css";

import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/layout/product-grid-items";

export const CarouselProducts = ({ products }: { products: Product[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={4}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 4,
        },
        1008: {
          slidesPerView: 3,
          spaceBetween: 4,
        },
      }}
      modules={[Pagination, Navigation]}
      loop={true}
      className="!pb-10 sm:h-full"
    >
      {products.slice(0, 8).map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard key={product.id} product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
