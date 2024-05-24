import { ORDER_URL, USER_ID, USER_PASSWORD } from '@/constants/api';
import { generateBasicToken } from '@/utils/auth';

export const orderItems = async (cartItemIds: number[]): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(ORDER_URL, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItemIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to post orderItems');
  }
};
