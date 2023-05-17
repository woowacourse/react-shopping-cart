import { ReactElement } from 'react';

import useFetch from '@hooks/useFetch';

interface FetchedDataListProps<T> {
  endpoint: string;
  initialValue: T;
  children: (props: { data: T; errorStatus: boolean }) => ReactElement;
}

export const FetchedDataList = <T,>(props: FetchedDataListProps<T>) => {
  const { endpoint, initialValue, children } = props;

  const [data, errorStatus] = useFetch<T>(endpoint, initialValue);

  return children({ data, errorStatus });
};
