import { generateBasicToken } from '@utils/auth';

import { USER_ID, USER_PASSWORD } from './constants';
import endPoint from './endPoint';

export async function fetchOrders(selectedItemIds: number[]) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(endPoint.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      cartItemIds: selectedItemIds,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
}
