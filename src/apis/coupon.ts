import { apiRequest } from './apiRequest';
import { Coupon } from '../types/coupon';

const coupon = {
  getCouponList: async () => {
    const response = await apiRequest<{ content: Coupon[] }>({
      url: '/coupons',
      method: 'GET',
    });

    return response.content;
  },
};

export default coupon;
