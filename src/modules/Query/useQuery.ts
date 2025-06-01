import { useEffect } from "react";
import { useQueryClient } from "./QueryProvider";
import { getQueryPromise, setQueryPromise, clearQueryPromise } from "./QueryPromises";

interface UseQueryProps<T> {
  queryKey: string;
  queryFn: () => Promise<T>;
}

export default function useQuery<T>({ queryKey, queryFn }: UseQueryProps<T>) {
  const { getQueryData, setQueryData, getQueryStatus, setQueryStatus } = useQueryClient();

  const fetchData = async (forceFetch = false) => {
    setQueryStatus(queryKey, "loading");
    try {
      if (getQueryData(queryKey) && !forceFetch) {
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
      clearQueryPromise(queryKey);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData(true);

  return {
    data: getQueryData(queryKey) as T,
    status: getQueryStatus(queryKey),
    fetchData,
    refetch,
  };
}
