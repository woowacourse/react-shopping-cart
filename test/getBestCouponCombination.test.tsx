import { getBestCouponCombination } from '@/features/Coupon/utils/combinations';
import { mockCartItems } from './Cart.data';
import { couponsForCombination } from './Coupon.data';

describe('getBestCouponCombination', () => {
  const priceContext = {
    isRemoteArea: false,
    deliveryFee: 3000,
    totalPrice: 100000,
  };

  it('가장 높은 할인 조합을 반환한다.', () => {
    const best = getBestCouponCombination(couponsForCombination, mockCartItems, priceContext);
    const bestIds = best.map((c) => c.id).sort();

    expect(bestIds).toEqual([1, 3]);
  });

  it('최대 2개의 쿠폰만 조합된다.', () => {
    const best = getBestCouponCombination(couponsForCombination, mockCartItems, priceContext);
    expect(best.length).toBeLessThanOrEqual(2);
  });

  it('할인 금액이 동일한 조합이 여러 개일 경우 우선순위가 빠른 것을 선택한다.', () => {
    const best = getBestCouponCombination(couponsForCombination, mockCartItems, priceContext);
    const bestIds = best.map((c) => c.id).sort();

    expect(bestIds).toEqual([1, 3]);
  });
});
