import { calculateFixedDiscount, calculateBogoDiscount, calculatePercentageDiscount } from './couponCalculator';
import { fixedCoupon, percentageCoupon } from '../../../mocks/coupons';
import { newParselyCartItemData } from '../../../mocks/cartItems';

describe('couponCalculator', () => {
  it('고정 금액 할인 쿠폰의 할인 금액을 계산할 수 있다.', () => {
    expect(calculateFixedDiscount(fixedCoupon)).toBe(5000);
  });

  it('Buy X Get Y 할인 쿠폰의 할인 금액을 계산할 수 있다.', () => {
    expect(calculateBogoDiscount([newParselyCartItemData])).toBe(1000);
  });

  it('퍼센트 할인 쿠폰의 할인 금액을 계산할 수 있다.', () => {
    expect(calculatePercentageDiscount(percentageCoupon, 100000)).toBe(30000);
  });
});
