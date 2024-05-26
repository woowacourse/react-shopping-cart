import { Coupon, CouponCode } from '@appTypes/shoppingCart';
import { generateBasicToken } from '@utils/auth';

import { USER_ID, USER_PASSWORD } from './constants';
import endPoint from './endPoint';

export async function fetchCouponList(): Promise<Map<CouponCode, Coupon>> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(endPoint.coupon, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  return new Map(data.map((coupon: Coupon) => [coupon.code, coupon]));
}
