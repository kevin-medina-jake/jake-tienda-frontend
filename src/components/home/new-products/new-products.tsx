import { getBestProductPoster, getNewProducts } from "@/lib/shopify";
import BestProductPoster from "./best-product-poster";

import Fondo from "@/assets/images/fondo.png";
import { Suspense } from "react";
import { CarouselProducts } from "./carousel-products";

export const NewProducts = async () => {
  const carouselNewProducts = await getNewProducts();
  const bestProductInfo = await getBestProductPoster();

  if (!bestProductInfo?.product) return null;

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
