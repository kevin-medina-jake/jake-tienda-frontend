import BestProductPoster from "@/components/home/best-product-poster";
import Fondo from "@/assets/images/fondo.png";

import { newProducts } from "@/service/api/product";
import { IBestProduct, IProductFilter } from "@/types/product";
import { bestProduct } from "@/service/api/best-product";
import { CarouselProducts } from "./carousel-products";
import { Suspense } from "react";

export const Products = async () => {
  const carouselNewProducts = (await newProducts()) as IProductFilter[];
  const bestProductInfo = (await bestProduct()) as IBestProduct;

  if (!bestProductInfo.image) return null;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4">
      <div className="pb-10">
        <h2 className="text-center text-3xl font-bold">¡Productos Nuevos!</h2>
      </div>

      <div className="grid w-full grid-cols-1 place-items-center gap-4 md:grid-cols-4">
        <section className="w-full overflow-hidden sm:col-span-1">
          <BestProductPoster data={bestProductInfo} bg={Fondo} />
        </section>

        <section className="h-full w-full sm:col-span-3">
          <Suspense fallback={<div className="h-72"></div>}>
            <CarouselProducts products={carouselNewProducts} />
          </Suspense>
        </section>
      </div>
    </section>
  );
};
