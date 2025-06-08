import { baseAPI } from '@/api/baseAPI';
import { CouponType } from '../models/coupon.types';

export async function getCoupons() {
  const basePath = `/coupons`;

  const data = await baseAPI<CouponType[]>({
    method: 'GET',
    path: basePath,
  });

  return data ?? [];
}
