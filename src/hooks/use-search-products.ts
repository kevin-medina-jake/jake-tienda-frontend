import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useDebounce } from "use-debounce";

import { useGetParams } from "./useGetParams";

export const useSearchProducts = () => {
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [productsSearch, setProductsSearch] = useState([]);
  const [search, setSearch] = useState<string>("");

  const { params: searchParams } = useGetParams({ name: "q" });

  useEffect(() => {
    if (searchParams !== "") {
      setSearch(searchParams);
    } else {
      setSearch("");
    }
  }, [searchParams]);

  const [debouncedSearch] = useDebounce(search, 300);

  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setProductsSearch([]);
      setSearchAttempted(false);
    }
  };

  useEffect(() => {
    if (pathname === "/products") return;
    setSearch("");
  }, [pathname]);

  // useEffect(() => {
  //   const searchProducts = async () => {
  //     if (debouncedSearch.trim().length < 1) {
  //       setProductsSearch([]);
  //       setSearchAttempted(false);
  //       return;
  //     }

  //     setLoading(true);
  //     setSearchAttempted(true);

  //     try {
  //       const res = await fetch(
  //         `/api/shopify/search?q=${encodeURIComponent(debouncedSearch)}`,
  //       );

  //       const data = await res.json();
  //       setProductsSearch(data);
  //     } catch (err) {
  //       setProductsSearch([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   searchProducts();
  // }, [debouncedSearch]);

  const searchProducts = useCallback(async () => {
    if (debouncedSearch.trim().length < 1) {
      setProductsSearch([]);
      setSearchAttempted(false);
      return;
    }

    setLoading(true);
    setSearchAttempted(true);

    try {
      const res = await fetch(
        `/api/shopify/search?q=${encodeURIComponent(debouncedSearch)}`,
      );

      const data = await res.json();
      setProductsSearch(data);
    } catch (err) {
      setProductsSearch([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    searchProducts();
  }, [debouncedSearch, searchProducts]);

  const isView = search.trim().length > 0;

  return {
    handleChange,
    loading,
    isView,
    productsSearch,
    pathname,
    searchAttempted,
  };
};
