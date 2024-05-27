import fetcher from './fetcher';

import { REQUEST_URL } from '@constants/url';

interface FetchResponse {
  type: 'PATCH' | 'DELETE' | 'POST';
  status: number;
}

export const orderProductList = async (cartItemIds: number[]): Promise<FetchResponse> => {
  const res = await fetcher.post({ requestUrl: REQUEST_URL.orders, body: { cartItemIds } });

  return { type: 'POST', status: res.status };
};
