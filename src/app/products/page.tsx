"use client";

import ProductsPage from "@/components/products/products-page";
import { useFilterProducts } from "@/hooks/use-filter-products";
import { getFilterProducts } from "@/service/api/product";
import { useStoreProducts } from "@/store/products";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Products() {
  const { setAllProducts } = useStoreProducts();
  const { handleCategories, handleBrands } = useFilterProducts();

  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");
    const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1;

    getFilterProducts({ page: currentPage }).then((products) =>
      setAllProducts(products)
    );
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (!category) return;

    const categories = category.split(",");
    handleCategories({ categories });
  }, [searchParams]);

  useEffect(() => {
    const brand = searchParams.get("brand");
    if (!brand) return;

    const brands = brand.split(",");
    handleBrands({ brands });
  }, [searchParams]);

  return <ProductsPage />;
}
