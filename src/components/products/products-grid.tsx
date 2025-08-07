"use client";

import { useStoreProducts } from "@/store/products";
import { CartProduct } from "../common/cart-product";
import { Image } from "lucide-react";

export default function ProductsGrid() {
  const { productsFilter, loadingStore } = useStoreProducts();

  return (
    <div className="grid flex-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loadingStore &&
        Array(8)
          .fill(0)
          .map((_, i) => <Skeleton key={i} />)}
      {loadingStore === false &&
        productsFilter.length > 0 &&
        productsFilter.map((product) => (
          <CartProduct key={product.id} product={product} isBig />
        ))}

      {loadingStore === false && productsFilter.length == 0 && (
        <div>
          <p>No hay productos disponibles</p>
        </div>
      )}
    </div>
  );
}

export const Skeleton = ({
  height = "h-90",
  width = "w-full",
  isImage = true,
}: {
  height?: string;
  width?: string;
  isImage?: boolean;
}) => {
  return (
    <div
      role="status"
      className={`flex animate-pulse items-center justify-center rounded-sm bg-gray-200 text-gray-300 ${height} ${width}`}
    >
      {isImage && <Image />}
    </div>
  );
};
