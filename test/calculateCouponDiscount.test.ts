import calculateCouponDiscount from '../src/utils/calculateCouponDiscount';
import getIdsFromCartItems from '../src/utils/getIdsFromCartItems';
import getOrderPrice from '../src/utils/getOrderPrice';
import { mockCoupons, mockCartItems } from './mocks';

describe('calculateCouponDiscount 함수 테스트', () => {
  const orderPrice = getOrderPrice(
    mockCartItems,
    getIdsFromCartItems(mockCartItems)
  );

  const deliveryFee = 3000;
  describe('쿠폰이 1개만 적용되는 경우', () => {
    test('FIXED5000 - 고정 5000원 할인', () => {
      const result = calculateCouponDiscount({
        coupons: [mockCoupons.find((c) => c.code === 'FIXED5000')!],
        checkedCartItems: mockCartItems,
        orderPrice,
        deliveryPrice: deliveryFee,
      });

      // 주문금액: 20,000,000 + 2,000 + 300 + 1,200 + 3,000 = 20,006,500
      // FIXED5000 적용 시 할인액: 5,000
      expect(result).toBe(5000);
    });

    test('MIRACLESALE - 30% 할인', () => {
      const result = calculateCouponDiscount({
        coupons: [mockCoupons.find((c) => c.code === 'MIRACLESALE')!],
        checkedCartItems: mockCartItems,
        orderPrice,
        deliveryPrice: deliveryFee,
      });

      // 주문금액: 20,006,500
      // 30% 할인 = 6,001950
      expect(result).toBe(6001950);
    });

    test('BOGO - 2+1 단가가 더 높은 상품에 적용', () => {
      const result = calculateCouponDiscount({
        coupons: [mockCoupons.find((c) => c.code === 'BOGO')!],
        checkedCartItems: mockCartItems,
        orderPrice,
        deliveryPrice: deliveryFee,
      });

      // 아트 포스터 1개 무료 -> 1,000원 할인
      expect(result).toBe(1000); // 아트 포스터 1개 무료
    });

    test('FREESHIPPING - 배송비 무료 ', () => {
      const result = calculateCouponDiscount({
        coupons: [mockCoupons.find((c) => c.code === 'FREESHIPPING')!],
        checkedCartItems: mockCartItems,
        orderPrice,
        deliveryPrice: deliveryFee + 3000,
      });

      // 배송비 6,000원 할인
      expect(result).toBe(6000);
    });
  });

  describe('쿠폰이 2개 적용되는 경우', () => {
    test('FIXED5000 + MIRACLESALE - 고정 5000원 할인 + 30% 할인', () => {
      const result = calculateCouponDiscount({
        coupons: [
          mockCoupons.find((c) => c.code === 'FIXED5000')!,
          mockCoupons.find((c) => c.code === 'MIRACLESALE')!,
        ],
        checkedCartItems: mockCartItems,
        orderPrice,
        deliveryPrice: deliveryFee,
      });

      //MIRACLESALE 먼저 적용
      //20,006,500 * 0.3 = 6,001950
      //+5000 = 6,006950

      // FIXED5000 먼저적용
      // 20,006,500 - 5,000 = 20,001,500
      // 20,001,500 * 0.3 = 6,000,450

      expect(result).toBe(6006950);
    });

    test('BOGO + MIRACLESALE - 2+1 + 무료 배송', () => {
      const result = calculateCouponDiscount({
        coupons: [
          mockCoupons.find((c) => c.code === 'BOGO')!,
          mockCoupons.find((c) => c.code === 'MIRACLESALE')!,
        ],
        checkedCartItems: mockCartItems,
        orderPrice,
        deliveryPrice: deliveryFee,
      });

      //BOGO 먼저 적용
      // 20,006,500 - 1,000 = 20,005,500
      // 20,005,500 * 0.3 = 6,001,650
      // 6,002,650

      // MIRACLESALE 먼저적용
      // 20,006,500 * 0.3 = 6,001,950
      // +1000 = 6,002,950

      expect(result).toBe(6002950);
    });
  });
});
