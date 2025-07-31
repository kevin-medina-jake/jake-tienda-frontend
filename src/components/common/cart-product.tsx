"use client";

import Link from "next/link";
import Image from "next/image";

import { useStoreShoppingCart } from "@/store/shopping-cart";
import { ShoppingCart } from "lucide-react";

export const CartProduct = ({
  product,
  isBig = false,
}: {
  product: any;
  isBig?: boolean;
}) => {
  const { addProduct } = useStoreShoppingCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    addProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
  };

  const style = isBig ? "" : "h-[306px]";

  const height = isBig ? 610 : 306;
  const width = isBig ? 610 : 306;

  return (
    <Link
      href={`/view-product/${product.slug}`}
      className="block overflow-hidden"
    >
      <div
        key={product.id}
        className="bg-blue-50 rounded-sm overflow-hidden flex flex-col gap-2 border border-blue-100 hover:shadow"
      >
        <section className={`aspect-square ${style}`}>
          <Image
            src={product.image ?? "/not-found.png"}
            alt={product.name}
            width={width}
            height={height}
            className="rounded object-cover"
          />
        </section>

        <h3 className="font-semibold text-xl px-2 text-left w-full overflow-hidden line-clamp-1">
          {product.name}
        </h3>

        <section className="flex gap-4 items-center px-2 pb-2">
          <div className="text-left">
            <p className="text-xs font-light">Precio</p>
            <p className="text-xl font-bold">
              {product.price.toLocaleString("es-CO")}
            </p>
          </div>

          <div className="group ml-auto">
            <button
              onClick={handleAddToCart}
              className="border group-hover:text-white cursor-pointer border-blue-300 group-hover:border-blue-600 group-hover:bg-blue-600 transition-[width] duration-300 rounded-sm group-hover:w-30 w-10 h-10 font-medium flex gap-2 items-center justify-center px-2 overflow-hidden"
            >
              <ShoppingCart />
              <span className="sm:group-hover:inline hidden text-sm whitespace-nowrap">
                Carrito
              </span>
            </button>
          </div>
        </section>
      </div>
    </Link>
  );
};
