import { Coupon } from '../types/coupon';
import { apiClient } from './apiClient';

export const getCoupons = async (): Promise<Coupon[]> => {
  try {
    return await apiClient<Coupon[]>('/coupons');
  } catch (error) {
    throw new Error('쿠폰 목록을 불러오는 중 에러 발생');
  }
};
