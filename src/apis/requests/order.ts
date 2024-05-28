import { BASE_URL_LIST } from '../baseUrlList';
import { ENDPOINT } from '../endpointList';
import { requestPost } from '../fetcher';

export const requestOrders = async (cartItemIdList: number[]) => {
  await requestPost({
    baseUrl: BASE_URL_LIST.CART,
    endpoint: ENDPOINT.ORDERS,
    body: {
      cartItemIds: cartItemIdList,
    },
  });
};
