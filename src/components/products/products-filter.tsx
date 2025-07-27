"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ProductsFilter({ isMobile, isOpen, onClose }: Props) {
  const [selectedOrder, setSelectedOrder] = useState("Recientes");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1000000);

  const toggleSelection = (
    list: string[],
    item: string,
    setList: (v: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const content = (
    <div className="space-y-6 bg-white h-full w-64 md:w-auto">
      <h3 className="text-lg font-semibold">Filtros</h3>

      {/* Orden */}
      <div>
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
      </div>

      {/* Marcas */}
      <div>
        <h4 className="font-medium">Marca</h4>
        {["Reloop", "Numark"].map((brand) => (
          <label
            key={brand}
            className="flex items-center space-x-2 mt-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() =>
                toggleSelection(selectedBrands, brand, setSelectedBrands)
              }
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Categorías */}
      <div>
        <h4 className="font-medium">Categoría</h4>
        {["Reloop", "Numark"].map((cat) => (
          <label
            key={cat}
            className="flex items-center space-x-2 mt-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                toggleSelection(selectedCategories, cat, setSelectedCategories)
              }
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
          max={4000000}
          step={50000}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm mt-2">
          Hasta: ${priceRange.toLocaleString("es-CO")}
        </p>
      </div>
    </div>
  );

  if (!isMobile) return content;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-72 bg-blue-50 z-50 shadow-lg"
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
