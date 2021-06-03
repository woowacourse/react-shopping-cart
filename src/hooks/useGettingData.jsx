import useSWR from 'swr';
import { requestGetItemList } from '../request/request';

const useGettingData = (path) => {
  const { data, error, mutate } = useSWR(path, requestGetItemList, {
    suspense: true,
  });

  return {
    mutate,
    data,
    isError: error,
  };
};

export default useGettingData;
