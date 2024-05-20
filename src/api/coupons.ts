import type { Coupon } from '@/types/coupon';
import { ENDPOINT } from '@/api/config';
import { ERROR_MESSAGE } from '@/constants/error';
import apiFetch from '@/api/apiFetch';

export async function getCouponList(): Promise<Coupon[]> {
  const response = await apiFetch({
    url: ENDPOINT.coupon.getList,
    options: { method: 'GET' },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.getCouponList);
  }

  const data = await response.json();
  return data;
}
