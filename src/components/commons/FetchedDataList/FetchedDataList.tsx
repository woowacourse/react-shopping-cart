import { ReactElement, useCallback, useEffect, useState } from 'react';

import useFetch from '@hooks/useFetch';

interface FetchedDataListProps<T> {
  endpoint: string;
  initialValue: T;
  isDeleteItem?: boolean;
  children: (props: { data: T; isError: boolean }) => ReactElement;
}

export const FetchedDataList = <T,>(props: FetchedDataListProps<T>) => {
  const { endpoint, initialValue, isDeleteItem, children } = props;
  const [data, setData] = useState(initialValue);
  const [isError, setIsError] = useState(false);

  const { getData } = useFetch(endpoint);

  const fetchData = useCallback(async () => {
    try {
      const data = await getData<T>();
      setData(data);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  }, [getData]);

  useEffect(() => {
    fetchData();
  }, [endpoint, fetchData, isDeleteItem]);

  return children({ data, isError });
};
