"use client";

import ProductsPage from "@/components/products/products-page";
import { getFilterProducts } from "@/service/api/product";
import { useStoreProducts } from "@/store/products";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Products() {
  const { setAllProducts } = useStoreProducts();
  const searchParams = useSearchParams();

  useEffect(() => {
    const raw = searchParams.get("page");
    const currentPage = raw && !isNaN(Number(raw)) ? Number(raw) : 1;

    getFilterProducts({ page: currentPage }).then((products) =>
      setAllProducts(products)
    );
  }, [searchParams]);

  return <ProductsPage />;
}
