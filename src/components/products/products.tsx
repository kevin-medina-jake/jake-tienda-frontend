"use client";

import { ProductsFilter } from "./products-filter";
import { ProductsGrid } from "./products-grid";
import { ProductsFilterMovilDrawer } from "../common/products-filter-movil-drawer";
import { usePagination } from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { useStoreProducts } from "@/store/products";
import { useGetParams } from "@/hooks/useGetParams";
import { useFilterProducts } from "@/hooks/use-filter-products";

export const Products = () => {
  const { currentPage, setPage } = usePagination();
  const { setAllProducts, filters, setLoading, allProducts } =
    useStoreProducts();
  const { handleBrands, handleCategories } = useFilterProducts();
  const { params: search, loadingParams: loadingSearch } = useGetParams({
    name: "q",
  });
  const { params: brand, loadingParams: loadingBrand } = useGetParams({
    name: "brand",
  });
  const { params: category, loadingParams: loadingcategory } = useGetParams({
    name: "category",
  });

  const [pagination, setPagination] = useState<{
    pageCount: number;
    total: number;
    pageSize: number;
    page: number;
  }>();

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
    if (loadingSearch) return;

    if (brand !== "" || loadingBrand || category !== "" || loadingcategory)
      return;

    if (search !== "") {
      getProductsByPageAndSearch({ search: search, page: currentPage });
      return;
    } else if (search === "") {
      getProductsByPage({ page: currentPage });
      return;
    }
  }, [currentPage, search, loadingSearch]);

  const getProductsByCategoryAndBrand = async ({
    name,
    search,
    page,
  }: {
    name: string;
    search: string;
    page: number;
  }) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/strapi/search/category-and-brand?${name}=${encodeURIComponent(search)}&page=${page}`,
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
    if (!brand || loadingBrand) return;

    handleBrands({ brands: brand.split(",") });
    getProductsByCategoryAndBrand({
      name: "brand",
      search: brand,
      page: currentPage,
    });
  }, [brand, currentPage, loadingBrand]);

  useEffect(() => {
    if (!category || loadingcategory) return;

    handleCategories({ categories: category.split(",") });
    getProductsByCategoryAndBrand({
      name: "category",
      search: category,
      page: currentPage,
    });
  }, [category, currentPage, loadingcategory]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:py-10">
      <ProductsFilterMovilDrawer />

      <div className="relative flex min-h-[50vh] w-full gap-6">
        <ProductsFilter />

        <ProductsGrid
          currentPage={currentPage}
          setPage={setPage}
          pagination={pagination}
        />
      </div>
    </div>
  );
};
