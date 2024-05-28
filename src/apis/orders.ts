import { generateBasicToken } from '../utils/auth';

const API_URL = process.env.VITE_API_URL ?? 'undefined_URL';
const USER_ID = process.env.VITE_API_USER_ID ?? 'undefined_USER_ID';
const USER_PASSWORD =
  process.env.VITE_API_USER_PASSWORD ?? 'undefined_USER_PASSWORD';

export const requestOrders = async (CartItemIdList: number[]) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cartItemIds: CartItemIdList,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to order:');
  }
};
