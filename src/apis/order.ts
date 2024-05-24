import fetcher from './fetcher';

import { REQUEST_URL } from '@constants/url';

export const orderProductList = async (cartItemIds: number[]) => {
  const res = await fetcher.post({ requestUrl: REQUEST_URL.orders, body: { cartItemIds } });

  return { type: 'POST', status: res.status };
};
