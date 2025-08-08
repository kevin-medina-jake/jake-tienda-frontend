import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetParams = ({ name }: { name: string }) => {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<string>("");
  const [loadingParams, setLoadingParams] = useState(true);

  useEffect(() => {
    setLoadingParams(true);
    setParams(searchParams?.get(name)?.trim() ?? "");
    setLoadingParams(false);
  }, [searchParams]);

  return { params, loadingParams };
};
