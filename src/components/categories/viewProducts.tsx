"use client";

import { Image } from "lucide-react";

import { useStoreProducts } from "@/store/products";
import { CartProduct } from "../common/cart-product";
import { Pagination } from "../common/pagination";

export const ViewProducts = ({
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

      <Pagination
        loadingStore={loadingStore}
        productsFilter={productsFilter}
        pagination={pagination}
        setPage={setPage}
        currentPage={currentPage}
      />
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
