import Images from "@/assets/home/carrousel/image copy 2.png";
import { CarrouselProducts } from "./carrousel-products";

export const Products = () => {
  return (
    <section className="relative max-w-7xl mx-auto w-full px-4">
      <div className="pb-4">
        <h2 className="text-2xl font-bold">¡Productos Nuevos!</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <section className="sm:col-span-1 rounded-sm overflow-hidden">
          <div className="w-full h-auto sm:h-full">
            <img
              src={Images.src}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="sm:col-span-3 h-full w-full">
          <CarrouselProducts />
        </section>
      </div>
    </section>
  );
};
