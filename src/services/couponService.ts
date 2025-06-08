import { apiClient } from './apiClient';
import { Coupon } from '../types/coupon';

export const couponService = {
  getCoupons: async (): Promise<Coupon[]> => {
    const response = await apiClient<Coupon[]>({
      method: 'GET',
      path: '/coupons',
    });
    return response;
  },
};
