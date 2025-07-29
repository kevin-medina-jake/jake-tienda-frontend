"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const CartProduct = ({ product }: { product: any }) => {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("Agregar al carrito:", product);
  };

  return (
    <Link href={`/view-product/${product.slug}`} className="block">
      <div
        key={product.id}
        className="bg-blue-50 rounded-sm overflow-hidden flex flex-col gap-2 border border-blue-100 hover:shadow"
      >
        <section className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </section>

        <h3 className="font-semibold text-xl px-2 text-left">{product.name}</h3>

        <section className="flex gap-4 justify-between items-center px-2 pb-2">
          <div className="text-left">
            <p className="text-xs font-light">Precio</p>
            <p className="text-xl font-bold">
              {product.price.toLocaleString("es-CO")}
            </p>
          </div>

          <div className="group w-full flex flex-row-reverse">
            <button
              onClick={handleAddToCart}
              className="border group-hover:text-white cursor-pointer border-blue-300 group-hover:border-blue-600 group-hover:bg-blue-600 transition-[width] duration-300 rounded-sm group-hover:w-full size-10 font-medium flex gap-2 items-center justify-center px-2 overflow-hidden"
            >
              <ShoppingCart />
              <span className="group-hover:inline hidden text-sm whitespace-nowrap">
                Agregar al carrito
              </span>
            </button>
          </div>
        </section>
      </div>
    </Link>
  );
};
