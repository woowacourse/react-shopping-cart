import { ENDPOINT } from './config';
import { ERROR_MESSAGE } from '@/constants/error';
import apiFetch from './apiFetch';

export async function postOrders(orderedCartItemIds: number[]): Promise<void> {
  const response = await apiFetch({
    url: ENDPOINT.order.postOrders,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItemIds: orderedCartItemIds }),
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.postOrders);
  }
}
