"use client";

import { useFilterProducts } from "@/hooks/use-filter-products";
import { useStoreProducts } from "@/store/products";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ProductsFilter({ isMobile, isOpen, onClose }: Props) {
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

    setSelectedCategories((prev: string[]) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((option) => option !== value)
    );
  };

  useEffect(
    () => handleCategories({ categories: selectedCategories }),
    [selectedCategories]
  );

  const handleChangeBrands = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSelectedBrands((prev: string[]) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((option) => option !== value)
    );
  };

  useEffect(() => handleBrands({ brands: selectedBrands }), [selectedBrands]);

  const content = (
    <div className="space-y-6 bg-white h-full w-64 md:w-auto">
      <h3 className="text-lg font-semibold">Filtros</h3>

      {/* Orden */}
      {/* <div>
        <h4 className="font-medium">Orden</h4>
        {["Recientes", "Precio Ascendente", "Precio Descendente"].map((o) => (
          <label
            key={o}
            className="flex items-center space-x-2 mt-2 cursor-pointer"
          >
            <input
              type="radio"
              name="order"
              checked={selectedOrder === o}
              onChange={() => setSelectedOrder(o)}
            />
            <span>{o}</span>
          </label>
        ))}
      </div> */}

      {/* Marcas */}
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

      {/* Categorías */}
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

  if (!isMobile) return content;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-72 bg-blue-50 z-50 shadow-lg"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Filtros</h3>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
