"use client";

import { useFilterProducts } from "@/hooks/use-filter-products";
import { useStoreProducts } from "@/store/products";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const SearchProducts = () => {
  const { handleSearch } = useFilterProducts();
  const { filters } = useStoreProducts();
  const { search } = filters;

  const pathname = usePathname();
  const router = useRouter();

  const [wasEmpty, setWasEmpty] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (wasEmpty && value.trim() !== "" && pathname !== "/products") {
      router.push("/products");
    }

    setWasEmpty(value.trim() === "");

    handleSearch({ search: value });
  };

  return (
    <div className="relative flex w-full items-center">
      <input
        type="text"
        className="w-full rounded-full border border-gray-400 px-4 py-2 focus:border-blue-50"
        placeholder="Buscar..."
        value={search}
        onChange={handleChange}
      />
      <Search className="absolute right-4" />
    </div>
  );
};
