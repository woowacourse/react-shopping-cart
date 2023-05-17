import { ReactElement } from 'react';

import useFetch from '@hooks/useFetch';

interface FetchedDataListProps<T> {
  endpoint: string;
  initialValue: T;
  children: (props: { data: T; fetchStatus: number }) => ReactElement;
}

export const FetchedDataList = <T,>(props: FetchedDataListProps<T>) => {
  const { endpoint, initialValue, children } = props;

  const [data, fetchStatus] = useFetch<T>(endpoint, initialValue);

  return children({ data, fetchStatus });
};
