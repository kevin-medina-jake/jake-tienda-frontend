"use client";

import { Suspense } from "react";
import { SearchProducts } from "./search-products";

export const SearchProductsWrapper = () => {
  return (
    <Suspense fallback={null}>
      <SearchProducts />
    </Suspense>
  );
};
