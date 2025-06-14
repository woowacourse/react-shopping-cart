import { baseAPI } from './baseAPI';
import { CouponContent } from './type';

export async function getCouponData() {
  return baseAPI<CouponContent[]>({
    method: 'GET',
    path: `/coupons`,
  });
}
