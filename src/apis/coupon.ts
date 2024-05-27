import { COUPONS_URL, USER_ID, USER_PASSWORD } from '@/constants/api';
import { Coupon } from '@/types/coupon';
import { generateBasicToken } from '@/utils/auth';

export const fetchCoupons = async (): Promise<Coupon[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(COUPONS_URL, {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch coupons');
  }

  const data = await response.json();

  return data;
};
