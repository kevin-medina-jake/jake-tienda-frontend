import { useStoreProducts } from "@/store/products";
import { IProductFilter } from "@/types/product";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearchProducts = () => {
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [productsSearch, setProductsSearch] = useState<IProductFilter[]>([]);
  // Nuevo estado para el índice del producto seleccionado
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);

  const {
    filters,
    setAllProducts,
    setLoading: setLoadingStore,
    setFilters,
  } = useStoreProducts();

  const { search } = filters;
  const [debouncedSearch] = useDebounce(search, 300);

  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = ({ search }: { search: string }) => {
    const newFilter = {
      ...filters,
      search,
    };

    setFilters(newFilter);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch({ search: value });

    if (value.trim() === "") {
      setProductsSearch([]);
      setSearchAttempted(false);
      setSelectedProductIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalProducts = productsSearch.length;

    if (totalProducts > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault(); // Evita que el cursor se mueva en el input
        setSelectedProductIndex((prevIndex) =>
          prevIndex < totalProducts - 1 ? prevIndex + 1 : prevIndex,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault(); // Evita que el cursor se mueva en el input
        setSelectedProductIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : 0,
        );
      } else if (e.key === "Enter") {
        if (selectedProductIndex !== -1) {
          const selectedProduct = productsSearch[selectedProductIndex];
          if (selectedProduct) {
            e.preventDefault();
            router.push(`/view-product/${selectedProduct.slug}`);
          }
        } else {
          // Lógica actual de Enter si no hay nada seleccionado
          (e.target as HTMLInputElement).blur();
          if (pathname !== "/products") {
            router.push(`/products?q=${encodeURIComponent(debouncedSearch)}`);
            allProducts();
          } else {
            allProducts();
          }
        }
      }
    } else if (e.key === "Enter") {
      // Lógica de Enter cuando no hay productos en la lista
      (e.target as HTMLInputElement).blur();
      if (pathname !== "/products") {
        router.push(`/products?q=${encodeURIComponent(debouncedSearch)}`);
        allProducts();
      } else {
        allProducts();
      }
    }
  };

  useEffect(() => {
    if (pathname === "/products") return;
    handleSearch({ search: "" });
  }, [pathname]);

  useEffect(() => {
    // Cuando los resultados de búsqueda cambian, reiniciamos el índice
    setSelectedProductIndex(-1);
  }, [debouncedSearch]);

  const allProducts = async () => {
    setLoading(true);
    setLoadingStore(true);
    try {
      const res = await fetch(
        `/api/strapi/search?q=${encodeURIComponent(search)}`,
      );
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      setAllProducts([]);
      setProductsSearch([]);
    } finally {
      setLoading(false);
      setLoadingStore(false);
    }
  };

  const searchProducts = async () => {
    if (debouncedSearch.trim().length < 2) {
      setProductsSearch([]);
      setSearchAttempted(false);
      setSelectedProductIndex(-1);
      return;
    }

    setLoading(true);
    setSearchAttempted(true);

    try {
      const res = await fetch(
        `/api/strapi/search?q=${encodeURIComponent(debouncedSearch)}`,
      );
      const data = await res.json();
      setProductsSearch(data);
    } catch (err) {
      setProductsSearch([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [debouncedSearch]);

  const isView = search.trim().length > 1;

  return {
    search,
    handleChange,
    handleKeyDown,
    loading,
    isView,
    productsSearch,
    pathname,
    searchAttempted,
    selectedProductIndex, // Se retorna el nuevo estado
  };
};
