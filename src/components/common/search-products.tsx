"use client";

import Image from "next/image";
import Link from "next/link";
import { RefreshCw, Search } from "lucide-react";
import { useFilterProductsSearch } from "@/hooks/use-filter-products";
import { IState, useStoreProducts } from "@/store/products";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useStore } from "@/hooks/useStore";

export const SearchProducts = () => {
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const { handleSearch } = useFilterProductsSearch();
  const {
    filters,
    setProductsSearch,
    setAllProducts,
    setLoading: setLoadingStore,
  } = useStoreProducts();
  const { search } = filters;
  const [debouncedSearch] = useDebounce(search, 300);

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
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      if (pathname !== "/products") {
        router.push(`/products?q=${encodeURIComponent(debouncedSearch)}`);
      } else {
      }

      if (pathname === "/products" && search.length < 1) {
        allProducts();
      }

      if (pathname === "/products" && search.length > 1) {
        allProducts();
      }
    }
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
  const cartStore = useStore<IState, IState>(
    useStoreProducts,
    (state: IState) => state,
  );

  if (!cartStore) return null;

  const { productsSearch } = cartStore;

  return (
    <section className="relative">
      <div className="group">
        <div className="relative flex w-full items-center">
          <input
            type="text"
            className="w-full rounded-full border border-gray-400 px-4 py-2 focus:border-blue-50"
            placeholder="Buscar..."
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Search className="absolute right-4" />
          {loading && <RefreshCw className="absolute right-14 animate-spin" />}
        </div>

        {isView && (
          <ul className="absolute top-[121%] z-10 hidden max-h-96 w-full flex-col gap-2 overflow-y-auto rounded-sm bg-white p-2 shadow-lg group-focus-within:flex sm:top-[100%]">
            {loading ? (
              <div className="bg-blue-200 p-2 text-center">Buscando...</div>
            ) : productsSearch.length > 0 ? (
              productsSearch.map((product) => (
                <li
                  key={product.id}
                  className={
                    pathname.includes(product.slug)
                      ? "bg-green-200"
                      : "hover:bg-blue-100"
                  }
                >
                  <Link
                    href={`/view-product/${product.slug}`}
                    className="flex items-center gap-2 rounded-xs border border-gray-300 p-2"
                  >
                    <div>
                      <Image
                        src={product.image || "/not-found.png"}
                        alt="logo"
                        width={50}
                        height={50}
                      />
                    </div>
                    <p>
                      {product.categories.map((category) => category + " _ ")}
                      {product.brand} - {product.name}
                    </p>
                  </Link>
                </li>
              ))
            ) : searchAttempted && !loading ? (
              <div className="bg-blue-200 p-2 text-center">
                No se encontraron resultados
              </div>
            ) : null}
          </ul>
        )}
      </div>
    </section>
  );
};
