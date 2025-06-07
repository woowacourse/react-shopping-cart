import { useEffect } from "react";
import { clearQueryPromise, getQueryPromise, setQueryPromise } from "./QueryPromises";
import { getQueryData, setQueryData, setQueryStatus } from "./QueryStore";
import { useQueryData, useQueryStatus } from "./useQueryData";
import { Status } from "./types";

interface UseQueryProps<T> {
  queryKey: string;
  queryFn: () => Promise<T>;
  initialData?: Partial<T>;
}

const AUTO_REFETCH_INTERVAL = 5 * 60 * 1000; // 5분

interface UseQueryCommonResult {
  status: Status;
  fetchData: () => void;
  refetch: () => void;
}

export default function useQuery<T>(props: UseQueryProps<T> & { initialData: Partial<T> }): UseQueryCommonResult & {
  data: T;
};
export default function useQuery<T>(props: UseQueryProps<T> & { initialData?: undefined }): UseQueryCommonResult & {
  data: T | undefined;
};
export default function useQuery<T>({ queryKey, queryFn, initialData }: UseQueryProps<T>) {
  const data = useQueryData<T | undefined>(queryKey);
  const status = useQueryStatus(queryKey);

  const fetchData = async (forceFetch = false) => {
    setQueryStatus(queryKey, "loading");
    try {
      if (data && !forceFetch) {
        setQueryStatus(queryKey, "success");
        return;
      }
      let promise = getQueryPromise(queryKey);
      if (!promise || forceFetch) {
        promise = queryFn();
        setQueryPromise(queryKey, promise);
      }

      const response = await promise;
      setQueryData(queryKey, response);
      setQueryStatus(queryKey, "success");
      clearQueryPromise(queryKey);
    } catch (error) {
      setQueryStatus(queryKey, "error");
      setQueryData(queryKey, error);
      clearQueryPromise(queryKey);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => fetchData(true), AUTO_REFETCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const refetch = () => fetchData(true);

  if (status === "error") throw getQueryData(queryKey);
  return {
    data: data ?? initialData,
    status,
    fetchData,
    refetch,
  };
}
