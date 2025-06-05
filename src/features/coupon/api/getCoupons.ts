import { httpClient } from '../../../shared/api/httpClient';
import { Coupon } from '../types/coupon';

export const getCoupons = () => {
  return httpClient.get<Coupon[]>('/coupons');
};
