"use client";

import { useState } from "react";
import ProductsFilter from "./products-filter";
import ProductsGrid from "./products-grid";
import { Filter } from "lucide-react";

export default function ProductsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Buscar y Filtrar Productos</h1>
        {/* Botón de filtros (solo visible en móvil) */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center space-x-2 text-gray-700"
        >
          <Filter size={20} />
          <span>Filtros</span>
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar visible solo en desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ProductsFilter />
        </div>

        {/* Grid de productos */}
        <ProductsGrid />
      </div>

      {/* Sidebar móvil (deslizable) */}
      <ProductsFilter
        isMobile
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </div>
  );
}
