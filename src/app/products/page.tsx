"use client";

import { Suspense } from "react";
import ProductsPage from "@/components/products/products-page";
import { useFilterProducts } from "@/hooks/use-filter-products";
import { getFilterProducts } from "@/service/api/product";
import { useStoreProducts } from "@/store/products";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function ProductsContent() {
  const { setAllProducts } = useStoreProducts();
  const { handleCategories, handleBrands } = useFilterProducts();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");
    const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1;
    getFilterProducts({ page: currentPage }).then(setAllProducts);
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) handleCategories({ categories: category.split(",") });
  }, [searchParams]);

  useEffect(() => {
    const brand = searchParams.get("brand");
    if (brand) handleBrands({ brands: brand.split(",") });
  }, [searchParams]);

  return <ProductsPage />;
}

export default function Products() {
  return (
    <Suspense fallback={<div className="p-4">Loading products…</div>}>
      <ProductsContent />
    </Suspense>
  );
}
