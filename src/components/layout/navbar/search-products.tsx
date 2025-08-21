"use client";

import Link from "next/link";
import Image from "next/image";

import { useSearchProducts } from "@/hooks/use-search-products";

import { RefreshCw, Search } from "lucide-react";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    handleChange,
    loading,
    isView,
    productsSearch,
    pathname,
    searchAttempted,
  } = useSearchProducts();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (e.target as HTMLInputElement).blur();

    const form = e.currentTarget;
    const q = ((new FormData(form).get("q") as string) || "").trim();

    const newParams = new URLSearchParams(searchParams.toString());
    if (q) newParams.set("q", q);
    else newParams.delete("q");

    router.push(createUrl("/search", newParams));
  }

  const renderProductItem = (product: any) => {
    const isActive = pathname?.includes(product.handle);
    const itemClass = isActive ? "bg-green-300" : "hover:bg-blue-100";

    // const brand = product.brand || "Sin marca";
    // const name = product.name || "Sin nombre";
    // const image = product.image || "/not-found.png";
    // const categories =
    //   product.categories?.length > 0
    //     ? product.categories.join(" · ")
    //     : "Sin categoría";

    return (
      <li key={product.id} className={itemClass}>
        <Link
          href={`/product/${product.handle}`}
          className="flex items-center gap-2 rounded-xs border border-gray-300 p-2"
        >
          <Image
            src={product?.featuredImage?.url ?? "/not-found.png"}
            alt="logo"
            width={50}
            height={50}
          />

          <div className="text-sm">
            <p className="font-medium">{product.title}</p>
            {/* <p className="text-gray-500">
              {categories} · {brand}
            </p> */}
          </div>
        </Link>
      </li>
    );
  };

  const renderDropdown = () => {
    if (!isView) return null;

    return (
      <ul className="absolute top-[121%] z-10 flex max-h-90 w-full flex-col gap-2 overflow-y-auto rounded-sm bg-blue-50 p-2 text-black shadow-lg sm:top-[100%]">
        {loading ? (
          <div className="bg-blue-200 p-2 text-center">Buscando...</div>
        ) : productsSearch.length > 0 ? (
          productsSearch.map(renderProductItem)
        ) : searchAttempted ? (
          <div className="bg-blue-200 p-2 text-center">
            No se encontraron resultados
          </div>
        ) : (
          <div className="bg-blue-200 p-2 text-center">Buscando...</div>
        )}
      </ul>
    );
  };

  return (
    <section className="relative">
      <div className="group">
        <form onSubmit={onSubmit} className="relative flex w-full items-center">
          <input
            key={searchParams?.get("q")}
            type="text"
            name="q"
            placeholder="Buscar productos..."
            autoComplete="off"
            defaultValue={searchParams?.get("q") || ""}
            onChange={handleChange}
            className="w-full rounded-full border border-gray-400 px-4 py-2 focus:border-blue-50"
          />
          {loading ? (
            <RefreshCw className="absolute right-4 animate-spin" />
          ) : (
            <Search className="absolute right-4" />
          )}
        </form>

        {renderDropdown()}
      </div>
    </section>
  );
};
