import { CouponData } from '@entities/coupon/model/createCouponData';
import { getCoupons } from '@entities/coupon/api/getCoupons';

export const couponActions = {
  async fetchCoupons(couponData: CouponData) {
    couponData.setLoading(true);
    couponData.setError(null);

    try {
      const data = await getCoupons();
      couponData.setCoupons(data);
    } catch (error) {
      couponData.setError(
        error instanceof Error ? error.message : '쿠폰 목록을 불러오는데 실패했습니다.',
      );
    } finally {
      couponData.setLoading(false);
    }
  },
};
