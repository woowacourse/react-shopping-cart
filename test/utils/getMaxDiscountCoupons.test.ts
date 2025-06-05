import { Coupon } from '../../src/types';
import getMaxDiscountCoupons from '../../src/utils/getMaxDiscountCoupons';
import { mockCartItems, mockCoupons } from '../mocks';

describe('선택한 상품 목록과 적용할 쿠폰 목록을 제공하면 가능한 조합에서 가장 할인이 많이 되는 조합을 반환하는 함수 테스트', () => {
  it.each([
    [mockCoupons, [mockCoupons[3], mockCoupons[0]]],
    [
      [mockCoupons[0], mockCoupons[1], mockCoupons[2]],
      [mockCoupons[0], mockCoupons[2]],
    ],
  ])(
    '선택한 상품 목록, 적용할 쿠폰 목록, 배송비, 적용 쿠폰 개수를 주면 가장 할인이 많이 되는 조합의 쿠폰 id 목록을 반환한다.',
    (coupons, result) => {
      const deliveryPrice = 3000;
      const couponAmount = 2;
      expect(
        getMaxDiscountCoupons(mockCartItems, coupons as Coupon[], deliveryPrice, couponAmount)
      ).toEqual(result);
    }
  );
});
