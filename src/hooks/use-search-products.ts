import { useStoreProducts } from "@/store/products";
import { IProductFilter } from "@/types/product";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearchProducts = () => {
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [productsSearch, setProductsSearch] = useState<IProductFilter[]>([]);

  const {
    filters,
    setAllProducts,
    setLoading: setLoadingStore,
    setFilters,
  } = useStoreProducts();

  const { search } = filters;
  const [debouncedSearch] = useDebounce(search, 300);

  const handleSearch = ({ search }: { search: string }) => {
    const newFilter = {
      ...filters,
      search,
    };

    setFilters(newFilter);
  };

  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch({ search: value });

    if (value.trim() === "") {
      setProductsSearch([]);
      setSearchAttempted(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    handleCleanFiltersCategoryAndBrands();

    (e.target as HTMLInputElement).blur();

    if (search.trim().length < 2) return;

    router.push(`/products?q=${encodeURIComponent(search)}`);

    // const currentURL = new URL(window.location.href);
    // const searchParams = currentURL.searchParams;

    // if (searchParams.toString() && pathname !== "/products") {
    //   router.push("/products");
    //   allProducts();
    //   return;
    // }

    // if (pathname === "/products") {
    //   router.replace(`/products?q=${encodeURIComponent(search)}`);
    //   return;
    // }

    // router.push(`/products?q=${encodeURIComponent(search)}`);
  };

  const handleCleanFiltersCategoryAndBrands = () => {
    setFilters({ ...filters, categories: [], brands: [] });
  };

  useEffect(() => {
    if (pathname === "/products") return;
    handleSearch({ search: "" });
  }, [pathname]);

  const allProducts = async () => {
    setLoading(true);

    setLoadingStore(true);

    try {
      const res = await fetch(
        `/api/strapi/search?q=${encodeURIComponent(search)}`,
      );

      const data = await res.json();

      setAllProducts(data.products);
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
      return;
    }

    setLoading(true);
    setSearchAttempted(true);

    try {
      const res = await fetch(
        `/api/strapi/search?q=${encodeURIComponent(debouncedSearch)}&page=1`,
      );

      const data = await res.json();
      setProductsSearch(data.products);
    } catch (err) {
      setProductsSearch([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchProducts();
    handleCleanFiltersCategoryAndBrands();
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
  };
};
