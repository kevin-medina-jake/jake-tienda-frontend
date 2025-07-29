import Link from "next/link";
import { newProducts } from "@/service/api/product";
import { IBestProduct, INewProducts } from "@/types/product";
import { bestProduct } from "@/service/api/best-product";
import { CarouselProducts } from "./carousel-products";

export const Products = async () => {
  const carouselNewProducts = (await newProducts()) as INewProducts[];
  const bestProductInfo = (await bestProduct()) as IBestProduct;

  return (
    <section className="relative max-w-7xl mx-auto w-full px-4">
      <div className="pb-4">
        <h2 className="text-2xl font-bold">¡Productos Nuevos!</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <section className="sm:col-span-1 rounded-sm overflow-hidden">
          <div className="w-full h-auto sm:h-full">
            <Link href={"/view-product/" + bestProductInfo.slug}>
              <img
                src={bestProductInfo.image}
                alt={bestProductInfo.name}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </section>

        <section className="sm:col-span-3 h-full w-full">
          <CarouselProducts products={carouselNewProducts} />
        </section>
      </div>
    </section>
  );
};
