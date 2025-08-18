"use client";

import { ProductsFilter } from "./products-filter";
import { ProductsGrid } from "./products-grid";
import { ProductsFilterMovilDrawer } from "../common/products-filter-movil-drawer";
import { usePagination } from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { useStoreProducts } from "@/store/products";
import { useGetParams } from "@/hooks/useGetParams";

export const Products = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:py-10">
      {/* <ProductsFilterMovilDrawer /> */}

      <div className="relative flex min-h-[50vh] w-full gap-6">
        {/* <ProductsFilter /> */}
        {/* <ProductsGrid
          currentPage={currentPage}
          setPage={setPage}
          pagination={pagination}
        /> */}
      </div>
    </div>
  );
};
