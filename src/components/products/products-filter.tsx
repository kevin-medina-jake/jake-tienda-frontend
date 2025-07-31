"use client";

import { useEffect, useState } from "react";
import { useFilterProducts } from "@/hooks/use-filter-products";
import { useStoreProducts } from "@/store/products";
import { Filter } from "lucide-react";

export default function ProductsFilter() {
  const { allProducts } = useStoreProducts();
  const { filters, handlePrice, handleCategories, handleBrands } =
    useFilterProducts();

  const categories = [
    ...new Set(allProducts.flatMap((product) => product.categories)),
  ];

  const brands = [
    ...new Set(
      allProducts
        .map(({ brand }) => brand)
        .filter((item): item is string => item !== undefined)
    ),
  ];

  const maxPrice = Math.max(...allProducts.map((product) => product.price));

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { categories: categoriesStore, brands: brandsStore, price } = filters;

  const handleChangeCategories = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedCategories((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((option) => option !== value)
    );
  };

  useEffect(() => {
    handleCategories({ categories: selectedCategories });
  }, [selectedCategories]);

  const handleChangeBrands = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedBrands((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((option) => option !== value)
    );
  };

  useEffect(() => {
    handleBrands({ brands: selectedBrands });
  }, [selectedBrands]);

  return (
    <div className="space-y-3 bg-blue-50 p-4 fixed rounded-sm">
      <h3 className="text-lg font-semibold flex gap-2 items-center">
        <Filter size={20} /> Filtros
      </h3>

      {/* Marca */}
      <div>
        <h4 className="font-medium">Marca</h4>
        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center space-x-2 mt-2 cursor-pointer"
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
            className="flex items-center space-x-2 mt-2 cursor-pointer"
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
        <p className="text-sm mt-2">Hasta: ${price.toLocaleString("es-CO")}</p>
      </div>
    </div>
  );
}
