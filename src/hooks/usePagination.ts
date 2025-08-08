import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentPage = searchParams?.get("page");

    if (!currentPage) {
      const newSearchParams = new URLSearchParams(
        searchParams?.toString() ?? "",
      );
      newSearchParams.set("page", "1");
      router.replace(`?${newSearchParams.toString()}`);
    }
  }, [searchParams, router]);

  const currentPage = Number(searchParams?.get("page")) || 1;

  const setPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber === currentPage) return;

    const newSearchParams = new URLSearchParams(searchParams?.toString() ?? "");
    newSearchParams.set("page", pageNumber.toString());

    router.push(`?${newSearchParams.toString()}`);
  };

  return { currentPage, setPage };
};
