import { Coupon } from '../../src/types';
import { getOrderPrice } from '../../src/utils';
import applyCouponsToItems from '../../src/utils/applyCouponsToItems';
import { mockCartItems, mockCoupons } from '../mocks';

describe('선택한 상품 목록과 적용할 쿠폰 목록을 제공하면 앞에서 순서대로 적용하여 할인금액을 반환하는 함수 테스트', () => {
  const orderPrice = getOrderPrice(mockCartItems);
  const fixedCoupon = mockCoupons[0];
  const percentCoupon = mockCoupons[3];

  it.each([
    [
      [fixedCoupon, percentCoupon],
      (fixedCoupon.discount ?? 0) +
        ((orderPrice - (fixedCoupon.discount ?? 0)) * (percentCoupon.discount ?? 0)) / 100,
    ],
    [
      [percentCoupon, fixedCoupon],
      (orderPrice * (percentCoupon.discount ?? 0)) / 100 + (fixedCoupon.discount ?? 0),
    ],
  ])(
    '선택한 상품 목록과 적용할 쿠폰 목록을 제공하면 앞에서 순서대로 계산하여 나온 최종 할인금액을 반환한다.',
    (coupons, result) => {
      expect(applyCouponsToItems(mockCartItems, 3000, coupons as Coupon[])).toBe(result);
    }
  );
});
