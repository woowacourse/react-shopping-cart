import { generateBasicToken } from '../utils/auth';

const API_URL = process.env.VITE_API_URL ?? 'undefined_URL';
const USER_ID = process.env.VITE_API_USER_ID ?? 'undefined_USER_ID';
const USER_PASSWORD =
  process.env.VITE_API_USER_PASSWORD ?? 'undefined_USER_PASSWORD';

export const requestCouponList = async (): Promise<Coupon[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/coupons`, {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch coupons:');
  }
  const data = await response.json();

  return data;
};
