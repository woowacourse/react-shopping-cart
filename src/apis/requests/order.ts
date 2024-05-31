import { BASE_URL_LIST } from '../baseUrlList';
import { ORDER } from '../endpointList';
import { requestPost } from '../fetcher';

export const requestOrders = async (cartItemIdList: number[]) => {
  await requestPost({
    baseUrl: BASE_URL_LIST.CART,
    endpoint: ORDER.ORDER_LIST,
    body: {
      cartItemIds: cartItemIdList,
    },
  });
};
