"use client";

import { Suspense } from "react";
import ProductsPage from "@/components/products/products-page";
import { useFilterProducts } from "@/hooks/use-filter-products";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useStoreProducts } from "@/store/products";
import { getFilterProducts } from "@/service/api/product";

function ProductsContent() {
  const { setAllProducts, filters, setLoading, allProducts } =
    useStoreProducts();
  const { handleCategories, handleBrands } = useFilterProducts();

  const searchParams = useSearchParams();

  const getProductsBySearchParams = async ({
    name,
    search,
  }: {
    name: string;
    search: string;
  }) => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/strapi/products?${name}=${encodeURIComponent(search)}`,
      );

      const data = await res.json();

      setAllProducts(data);
    } catch (err) {
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (!category) return;

    handleCategories({ categories: category.split(",") });
    getProductsBySearchParams({ name: "category", search: category });
  }, [searchParams]);

  useEffect(() => {
    const brand = searchParams.get("brand");
    if (!brand) return;

    handleBrands({ brands: brand.split(",") });
    getProductsBySearchParams({ name: "brand", search: brand });
  }, [searchParams]);

  useEffect(() => {
    if (
      filters.search.length > 0 ||
      filters.brands.length > 0 ||
      filters.categories.length > 0 ||
      allProducts.length > 0
    )
      return;

    setLoading(true);
    const page = searchParams.get("page");
    const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1;

    getFilterProducts({ page: currentPage }).then((productsFilter) => {
      setLoading(false);
      setAllProducts(productsFilter);
    });
  }, []);

  return <ProductsPage />;
}

export default function ViewProducts() {
  return (
    <Suspense fallback={<div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
