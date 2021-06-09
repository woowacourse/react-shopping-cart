import useSWR from 'swr';

import { requestGet, deepCamelize } from '../utils';
import { BASE_URL, PATH } from '../constants';

const fetcher = async (url) => {
  const response = await requestGet({ url });

  if (response.status !== 200) {
    throw new Error(response);
  }
  const body = await response.json();
  return deepCamelize(body);
};

export const useProduct = () => {
  const { data, error, mutate } = useSWR(`${BASE_URL}${PATH.PRODUCT_LIST}`, fetcher);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
