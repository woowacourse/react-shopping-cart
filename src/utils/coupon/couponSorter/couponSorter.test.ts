import { sortCouponsByDiscountRate } from './couponSorter';
import { fixedCoupon, percentageCoupon } from '../../../mocks/coupons';

describe('couponSorter', () => {
  it('퍼센트 할인 쿠폰이 앞으로 가도록 정렬할 수 있다.', () => {
    expect(sortCouponsByDiscountRate([fixedCoupon, percentageCoupon])).toEqual([percentageCoupon, fixedCoupon]);
  });
});
