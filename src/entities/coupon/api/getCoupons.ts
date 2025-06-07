import { httpClient } from '@shared/api/httpClient';
import { CouponType } from '@entities/coupon/type/coupon.type';

const ERROR_MESSAGE = '쿠폰을 가져오는 데 실패했습니다.';

export const getCoupons = async (): Promise<CouponType[]> => {
  const response = await httpClient.get('/coupons');
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
  return response.json();
};
