import { selector } from 'recoil';
import { requestCouponList } from '../../apis/couponList';

export const couponListQuery = selector<Coupon[]>({
  key: 'couponListQuery',
  get: async () => {
    const result = await requestCouponList();
    return result;
  },
});
