"use client";

import { Suspense } from "react";
import ProductsPage from "@/components/products/products-page";
import { useFilterProducts } from "@/hooks/use-filter-products";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useStoreProducts } from "@/store/products";
import { getFilterProducts } from "@/service/api/product";

function ProductsContent() {
  const { handleCategories, handleBrands } = useFilterProducts();
  const { setAllProducts, filters, setLoading, allProducts } =
    useStoreProducts();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (filters.search.length > 0 && allProducts.length > 0) return;

    setLoading(true);
    const page = searchParams.get("page");
    const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1;
    getFilterProducts({ page: currentPage }).then((productsFilter) => {
      setLoading(false);
      setAllProducts(productsFilter);
    });
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
    <Suspense fallback={true}>
      <ProductsContent />
    </Suspense>
  );
}
