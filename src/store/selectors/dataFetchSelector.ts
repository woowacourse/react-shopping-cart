import { Coupon } from '@/types/coupon.type';
import { MOCK_MOCK_COUPON_LIST } from '@/constants/_mock/mockCouponList';
// import { getCouponList } from '@/api/coupons';
import { selector } from 'recoil';

export const couponState = selector<Coupon[]>({
  key: 'couponState',
  get: async () => {
    // const coupon = await getCouponList();
    // return coupon;
    return MOCK_MOCK_COUPON_LIST;
  },
});
