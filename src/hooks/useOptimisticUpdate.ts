import { useState, useEffect } from 'react';
import useFetch from './useFetch';

type optimisticUpdateProps<T> = {
  url: string;
  method: string;
  initialState: T | undefined;
};

const useOptimisticUpdate = <T, U>({ url, method, initialState }: optimisticUpdateProps<T>) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [{ data: fetchedData, error: fetchError }, triggerRequest] = useFetch<T>(url, method);

  const optimisticUpdate = async (newData: T, body: U) => {
    setIsLoading(true);

    await triggerRequest({ body });

    let finalData: T | undefined = newData; // Start with the optimistic new data

    // fetch error가 발생하면, 초기 상태로 되돌림
    if (fetchError) {
      finalData = initialState;
    }

    // fetch data가 있으면, fetch data로 업데이트
    if (fetchedData) {
      finalData = fetchedData;
    }

    setData(finalData); // Only update the state once
    setIsLoading(false);
  };

  useEffect(() => {
    if (fetchError) {
      setData(initialState);
    } else if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData, fetchError]);

  return { data, isLoading, optimisticUpdate };
};

export default useOptimisticUpdate;
