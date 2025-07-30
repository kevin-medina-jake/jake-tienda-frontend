"use client";

import { useFilterProducts } from "@/hooks/use-filter-products";
import { Search } from "lucide-react";

export const SearchProducts = () => {
  const { filters, handleSearch } = useFilterProducts();

  const { search } = filters;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch({ search: value });
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-400 focus:border-blue-50 rounded-full"
        placeholder="Buscar..."
        value={search}
        onChange={handleChange}
      />
      <Search className="absolute right-4" />
    </div>
  );
};
