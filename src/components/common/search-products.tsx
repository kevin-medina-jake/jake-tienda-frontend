"use client";

import { useFilterProducts } from "@/hooks/use-filter-products";
import { useStoreProducts } from "@/store/products";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const SearchProducts = () => {
  const { handleSearch } = useFilterProducts();
  const { filters, filteredProducts } = useStoreProducts();
  const { search } = filters;

  const pathname = usePathname();
  const router = useRouter();

  const wasEmpty: boolean = search === "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleSearch({ search: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/products");
    }
  };

  useEffect(() => {
    if (pathname === "/products") return;

    handleSearch({ search: "" });
  }, [pathname]);

  return (
    <section className="relative">
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
      </div>

      {filteredProducts.length > 0 &&
        wasEmpty !== true &&
        pathname !== "/products" && (
          <ul className="absolute top-[100%] flex max-h-96 w-full flex-col gap-2 overflow-y-auto rounded-sm bg-blue-50 p-2">
            {filteredProducts.map((product) => (
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
                    {product.categories.map((category) => category)} -
                    {product.brand} - {product.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
    </section>
  );
};
