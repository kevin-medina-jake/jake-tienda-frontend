import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetSearchParams = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState(true);

  useEffect(() => {
    setLoadingSearch(true);
    setSearch(searchParams?.get("q")?.trim() ?? "");
    setLoadingSearch(false);
  }, [searchParams]);

  return { search, loadingSearch };
};
