import useSWR from 'swr';
import { useHistory } from 'react-router-dom';

import { requestGet, requestPost, deepCamelize, deepDecamelize } from '../utils';
import { BASE_URL, ROUTE } from '../constants';

const getOrders = async (url) => {
  const response = await requestGet({ url });

  if (response.status !== 200) {
    throw new Error(response);
  }
  const body = await response.json();
  return deepCamelize(body);
};

export const useOrder = (customerName = '365kim') => {
  const history = useHistory();
  const { data, error, mutate } = useSWR(`${BASE_URL}/customers/${customerName}/orders`, getOrders);

  const checkout = async (orders) => {
    const response = await requestPost({
      url: `${BASE_URL}/customers/${customerName}/orders`,
      body: deepDecamelize(orders),
    });

    if (response.status !== 201) {
      throw new Error(response);
    }
    mutate();

    history.push(ROUTE.ORDER_LIST);
  };

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    checkout,
  };
};
