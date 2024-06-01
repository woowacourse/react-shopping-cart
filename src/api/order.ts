import { BASE_URL, HEADERS } from './common';

const ORDER_API_URL = `${BASE_URL}/orders`;

export const postOrders = async (orderItemIds: number[]) => {
  const response = await fetch(`${ORDER_API_URL}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ cartItemIds: orderItemIds }),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
};
