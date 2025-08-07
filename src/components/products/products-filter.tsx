"use client";

import { useEffect, useState } from "react";
import { useFilterProducts } from "@/hooks/use-filter-products";
import { useStoreProducts } from "@/store/products";
import { Filter } from "lucide-react";
import { Skeleton } from "./products-grid";

export default function ProductsFilter() {
  const { filters, allProducts, loadingStore } = useStoreProducts();
  const { handlePrice, handleCategories, handleBrands } = useFilterProducts();

  const categories = [
    ...new Set(allProducts.flatMap((product) => product.categories)),
  ];

  const brands = [
    ...new Set(
      allProducts
        .map(({ brand }) => brand)
        .filter((item): item is string => item !== undefined),
    ),
  ];

  const maxPrice = Math.max(...allProducts.map((product) => product.price));

  const { categories: categoriesStore, brands: brandsStore, price } = filters;

  const handleChangeCategories = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const newCategories = event.target.checked
      ? [...categoriesStore, value]
      : categoriesStore.filter((category) => category !== value);
    handleCategories({ categories: newCategories });
  };

  const handleChangeBrands = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const newBrands = event.target.checked
      ? [...brandsStore, value]
      : brandsStore.filter((brand) => brand !== value);

    handleBrands({ brands: newBrands });
  };

  if (loadingStore)
    return (
      <div className="sticky top-[100px] hidden h-full max-h-screen w-56 sm:block">
        <Skeleton isImage={false} height="h-[600px]" />
      </div>
    );

  return (
    <div className="sticky top-[100px] hidden h-full max-h-screen space-y-3 rounded-sm bg-blue-50 p-4 select-none sm:block">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <Filter size={20} /> Filtros
      </h3>

      {/* Marca */}
      <div>
        <h4 className="font-medium">Marca</h4>
        {brands.map((brand) => (
          <label
            key={brand}
            className="mt-2 flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              id={brand}
              value={brand}
              checked={brandsStore.includes(brand)}
              onChange={handleChangeBrands}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Categoría */}
      <div>
        <h4 className="font-medium">Categoría</h4>
        {categories.map((cat) => (
          <label
            key={cat}
            className="mt-2 flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              id={cat}
              value={cat}
              checked={categoriesStore.includes(cat)}
              onChange={handleChangeCategories}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      {/* Precio */}
      <div>
        <h4 className="font-medium">Precio</h4>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={price}
          onChange={(e) => handlePrice({ price: Number(e.target.value) })}
          className="w-full"
        />
        <p className="mt-2 text-sm">Hasta: ${price.toLocaleString("es-CO")}</p>
      </div>
    </div>
  );
}
