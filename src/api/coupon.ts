import { CouponType } from '../types';
import { BASE_URL, HEADERS } from './common';

const COUPON_API_URL = `${BASE_URL}/coupons`;

export const fetchCoupons = async (): Promise<CouponType[]> => {
  const response = await fetch(`${COUPON_API_URL}`, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return await response.json();
};
