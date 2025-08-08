"use client";

import { Image } from "lucide-react";

import { useStoreProducts } from "@/store/products";
import { CartProduct } from "../common/cart-product";

export const ProductsGrid = ({
  currentPage,
  pagination,
  setPage,
}: {
  currentPage: number;
  pagination:
    | {
        pageCount: number;
        total: number;
        pageSize: number;
        page: number;
      }
    | undefined;
  setPage: (page: number) => void;
}) => {
  const { productsFilter, loadingStore } = useStoreProducts();

  return (
    <div className="grid w-full gap-4">
      <div className="grid w-full flex-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loadingStore &&
          Array(8)
            .fill(0)
            .map((_, i) => <Skeleton key={i} />)}
        {loadingStore === false &&
          productsFilter.length > 0 &&
          productsFilter.map((product) => (
            <CartProduct key={product.id} product={product} isBig />
          ))}
      </div>

      {loadingStore === false && productsFilter.length == 0 && (
        <div className="grid h-full w-full place-content-center">
          <div>
            <p className="text-xl">
              No hay productos que coincidan con tus criterios
            </p>
          </div>
        </div>
      )}

      <div className="flex w-full gap-2">
        {loadingStore === false &&
          productsFilter.length > 0 &&
          Array.from({ length: pagination?.pageCount ?? 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={
                "flex h-10 w-10 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm border border-blue-300 px-2 font-medium transition-[width] duration-300 group-hover:w-22 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white " +
                (i + 1 === currentPage ? "bg-blue-600" : "")
              }
            >
              <span>{i + 1}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

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
