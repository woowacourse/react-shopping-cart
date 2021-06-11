import useSWR from 'swr';
import { useHistory } from 'react-router-dom';

import { requestGet, requestPost, deepCamelize, deepDecamelize } from '../utils';
import { BASE_URL, DEFAULT_CUSTOMER_NAME, ROUTE } from '../constants';

const getOrders = async (url) => {
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

export const useOrder = (customerName = DEFAULT_CUSTOMER_NAME) => {
  const history = useHistory();
  const { data, error, mutate } = useSWR(`${BASE_URL}/customers/${customerName}/orders`, getOrders);

  const checkout = async (orders) => {
    try {
      const response = await requestPost({
        url: `${BASE_URL}/customers/${customerName}/orders`,
        body: deepDecamelize(orders),
      });

      if (response.status !== 201) {
        throw new Error(response);
      }
      mutate();
      history.push(ROUTE.ORDER_LIST);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    checkout,
  };
};
