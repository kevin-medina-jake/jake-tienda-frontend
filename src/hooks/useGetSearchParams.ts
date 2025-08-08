import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetSearchParams = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setSearch(searchParams?.get("q") ?? "");
  }, [searchParams]);

  return { search };
};
