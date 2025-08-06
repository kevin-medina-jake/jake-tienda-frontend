"use client";

import { Suspense } from "react";
import { SearchProducts } from "./search-products";

export const SearchProductsWrapper = () => {
  return (
    <Suspense fallback={<div className="h-[42px] w-full"></div>}>
      <SearchProducts />
    </Suspense>
  );
};
