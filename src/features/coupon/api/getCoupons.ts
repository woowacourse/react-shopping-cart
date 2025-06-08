import { httpClient } from '../../../shared/api/httpClient';
import { Coupon } from '../types/coupon';

interface CouponsResponse {
  content: Coupon[];
}

export const getCoupons = () => {
  return httpClient.get<CouponsResponse>('/coupons');
};
