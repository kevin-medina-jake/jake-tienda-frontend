"use client";

import ProductsPage from "@/components/products/products-page";
import { getFilterProducts } from "@/service/api/product";
import { useStoreProducts } from "@/store/products";
import { useEffect } from "react";

export default function Products() {
  const { setAllProducts } = useStoreProducts();

  useEffect(() => {
    getFilterProducts({}).then((products) => setAllProducts(products));
  }, []);

  return <ProductsPage />;
}
