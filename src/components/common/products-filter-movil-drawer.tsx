"use client";

import { useEffect, useRef, useState } from "react";
import { useFilterProducts } from "@/hooks/use-filter-products";
import { useStoreProducts } from "@/store/products";
import { usePortalDrawer } from "@/hooks/use-portal-drawer";
import { Filter, X } from "lucide-react";

export const ProductsFilterMovilDrawer = () => {
  const [open, setOpen] = useState(false);
  const Portal = usePortalDrawer("products-filter");
  const asideRef = useRef<HTMLDivElement>(null);

  const { allProducts, filters } = useStoreProducts();
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

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { categories: categoriesStore, brands: brandsStore, price } = filters;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Cerrar al pasar a modo escritorio
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleChangeCategories = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setSelectedCategories((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((option) => option !== value),
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
        : prev.filter((option) => option !== value),
    );
  };

  useEffect(() => {
    handleBrands({ brands: selectedBrands });
  }, [selectedBrands]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mb-2 flex cursor-pointer items-center gap-2 p-2 font-semibold sm:hidden"
      >
        <Filter />
        Filtros
      </button>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/50 sm:hidden">
            <aside
              ref={asideRef}
              className="fixed top-0 left-0 flex h-full w-64 touch-auto flex-col gap-6 overflow-y-auto bg-blue-50 p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filtros</h3>
                <button onClick={() => setOpen(false)}>
                  <X className="" />
                </button>
              </div>

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
                  onChange={(e) =>
                    handlePrice({ price: Number(e.target.value) })
                  }
                  className="w-full touch-auto"
                />
                <p className="mt-2 text-sm">
                  Hasta: ${price.toLocaleString("es-CO")}
                </p>
              </div>
            </aside>
          </div>
        </Portal>
      )}
    </>
  );
};
