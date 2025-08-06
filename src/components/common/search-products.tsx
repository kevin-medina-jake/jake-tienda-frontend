"use client";

import Image from "next/image";
import Link from "next/link";

import { RefreshCw, Search } from "lucide-react";
import { useFilterProductsSearch } from "@/hooks/use-filter-products";
import { useStoreProducts } from "@/store/products";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const SearchProducts = () => {
  const [loading, setLoading] = useState(false);
  const { handleSearch } = useFilterProductsSearch();
  const {
    filters,
    productsSearch,
    setProductsSearch,
    setAllProducts,
    setLoading: setLoadingStore,
  } = useStoreProducts();

  const { search } = filters;
  const [debouncedSearch] = useDebounce(search, 500);

  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleSearch({ search: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (debouncedSearch == "") {
        allProducts();
      }

      (e.target as HTMLInputElement).blur();

      if (pathname !== "/products") {
        setAllProducts(productsSearch);
        router.push("/products");
      }

      if (pathname === "/products") {
        fetchResults();
        setAllProducts(productsSearch);
      }
    }
  };

  useEffect(() => {
    if (pathname === "/products") return;

    handleSearch({ search: "" });
  }, [pathname]);

  const isView = loading === false;

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

  const fetchResults = async () => {
    if (debouncedSearch.length < 1) {
      setProductsSearch([]);
      return;
    }

    setLoading(true);

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
    fetchResults();
  }, [debouncedSearch]);

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
          <ul className="absolute top-[121%] hidden max-h-96 w-full flex-col gap-2 overflow-y-auto rounded-sm bg-blue-500 p-2 group-focus-within:flex sm:top-[100%]">
            {productsSearch.map((product) => (
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
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
