import useSWR from 'swr';

import { requestGet, deepCamelize } from '../utils';
import { BASE_URL } from '../constants';

const getProducts = async (url) => {
  try {
    const response = await requestGet({ url });

    if (response.status !== 200) {
      throw new Error(response);
    }
    const body = await response.json();
    return deepCamelize(body);
  } catch (e) {
    console.error(e);
  }
};

export const useProducts = () => {
  const { data, error, mutate } = useSWR(`${BASE_URL}/products`, getProducts);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
