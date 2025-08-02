"use client";

import Link from "next/link";
import Image from "next/image";

import { useStoreShoppingCart } from "@/store/shopping-cart";
import { BadgeCheck, ShoppingCart } from "lucide-react";

export const CartProduct = ({
  product,
  isBig = false,
}: {
  product: any;
  isBig?: boolean;
}) => {
  const { products, addProduct } = useStoreShoppingCart();

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

  const handleCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    alert("En el carrito");
  };

  const style = isBig ? "" : "h-[306px]";

  const height = isBig ? 610 : 306;
  const width = isBig ? 610 : 306;

  const isProductInShoppingCart = products.some(
    (item) => item.id === product.id,
  );

  return (
    <Link
      href={`/view-product/${product.slug}`}
      className="block h-max overflow-hidden"
    >
      <div
        key={product.id}
        className="flex flex-col gap-2 overflow-hidden rounded-sm border border-blue-100 bg-blue-50 hover:shadow"
      >
        <section className={`aspect-square ${style} bg-white`}>
          <Image
            src={product.image ?? "/not-found.png"}
            alt={product.name}
            width={width}
            height={height}
            className="rounded object-cover"
          />
        </section>

        <section className="px-2">
          {isBig && (
            <p className="h-4 text-xs font-light">{product.brand ?? "Libre"}</p>
          )}
          <h3 className="line-clamp-1 w-full overflow-hidden text-left text-xl font-semibold">
            {product.name}
          </h3>

          <div className="flex gap-1 overflow-hidden">
            {product.categories &&
              product.categories.map((category: string) => (
                <span
                  key={category}
                  className="h-4 rounded-full bg-blue-200 px-1 text-xs font-light"
                >
                  {category}
                </span>
              ))}
          </div>
        </section>

        <section className="flex items-center gap-4 px-2 pb-2">
          <div className="text-left">
            <p className="text-xs font-light">Precio</p>
            <p className="text-xl font-bold">
              {product.price.toLocaleString("es-CO")}
            </p>
          </div>

          <div className="group ml-auto">
            {isProductInShoppingCart ? (
              <button
                onClick={handleCheck}
                className="grid size-10 place-content-center rounded-sm bg-green-200"
              >
                <BadgeCheck />
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex h-10 w-10 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm border border-blue-300 px-2 font-medium transition-[width] duration-300 group-hover:w-22 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
              >
                <ShoppingCart />
                <span className="hidden text-xs whitespace-nowrap sm:group-hover:inline">
                  Carrito
                </span>
              </button>
            )}
          </div>
        </section>
      </div>
    </Link>
  );
};
