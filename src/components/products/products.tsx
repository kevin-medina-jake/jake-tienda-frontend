"use client";

import { ProductsFilter } from "./products-filter";
import { ProductsGrid } from "./products-grid";
import { ProductsFilterMovilDrawer } from "../common/products-filter-movil-drawer";
import { usePagination } from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { useStoreProducts } from "@/store/products";
import { useGetSearchParams } from "@/hooks/useGetSearchParams";

export const Products = () => {
  const { currentPage, setPage } = usePagination();
  const { setAllProducts, filters, setLoading, allProducts } =
    useStoreProducts();
  const [pagination, setPagination] = useState<{
    pageCount: number;
    total: number;
    pageSize: number;
    page: number;
  }>();
  const { search } = useGetSearchParams();

  const getProductsByPage = async ({ page }: { page: number }) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/strapi/all-products?page=${page}`);
      const data = await res.json();

      setAllProducts(data.products);
      setPagination(data.meta);
    } catch (err) {
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByPageAndSearch = async ({
    search,
    page,
  }: {
    search: string;
    page: number;
  }) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/strapi/search?q=${encodeURIComponent(search)}&page=${page}`,
      );
      const data = await res.json();

      setAllProducts(data.products);
      setPagination(data.meta);
    } catch (err) {
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim().length > 0) {
      getProductsByPageAndSearch({ search: search, page: currentPage });
      console.log("search ****************", search);
    }

    if (search.trim().length < 0) {
      getProductsByPage({ page: currentPage });
      console.log("page-------------------------", search);
    }
  }, [currentPage, search]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:py-10">
      <ProductsFilterMovilDrawer />

      <div className="relative flex min-h-[50vh] w-full gap-6">
        <ProductsFilter />

        <ProductsGrid />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: pagination?.pageCount ?? 1 }).map((_, i) => (
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
