import { Coupon, CouponType } from '@/components/features/coupon';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import mockCartItems from '../src/mocks/data/mock-cart-items.json';

const mockDate = (dateString: string) => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(dateString));
};

describe('Coupon 클래스 테스트', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  describe('쿠폰 만료일 테스트', () => {
    // 모든 쿠폰에 만료일이 존재하기 때문에, 첫 번째 쿠폰으로 테스트 진행
    const fixedCoupon: CouponType = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: new Date('2025-11-30'),
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    };

    it('✅ 만료일이 미래인 쿠폰은 enable 상태이며 할인 금액이 적용된다.', () => {
      mockDate('2025-01-01T00:00:00');
      const coupon = new Coupon(fixedCoupon, mockCartItems, true);

      expect(coupon.disable).toBe(false);
      expect(coupon.discountAmount).toBe(5000);
    });

    it('❌ 만료일이 지난 쿠폰은 disable 상태이며 할인 금액은 0이다.', () => {
      mockDate('2026-01-01T00:00:00');

      const coupon = new Coupon(fixedCoupon, mockCartItems, false);

      expect(coupon.disable).toBe(true);
      expect(coupon.discountAmount).toBe(0);
    });
  });

  describe('FIXED5000 쿠폰 적용 조건 테스트', () => {
    const fixedCoupon: CouponType = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: new Date('2025-11-30'),
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    };

    it('✅ 주문 금액이 최소 금액 이상이면 enable 상태이며 할인 금액은 5,000원이다.', () => {
      // 전체 장바구니 금액: 100,000원 이상이라 가정
      const coupon = new Coupon(fixedCoupon, mockCartItems, false);

      expect(coupon.disable).toBe(false);
      expect(coupon.discountAmount).toBe(5000);
    });

    it('❌ 주문 금액이 최소 금액 미만이면 disable 상태가 되고 할인 금액은 0이다.', () => {
      // 에어포스2 - 가격 10,000원
      const lowPriceItemOnly = [mockCartItems[1]];

      const coupon = new Coupon(fixedCoupon, lowPriceItemOnly, false);

      expect(coupon.disable).toBe(true);
      expect(coupon.discountAmount).toBe(0);
    });
  });

  describe('BOGO 쿠폰 테스트', () => {
    const bogoCoupon: CouponType = {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      expirationDate: new Date('2025-06-30'),
      buyQuantity: 2,
      getQuantity: 1,
      discountType: 'buyXgetY',
    };

    it('✅ 조건을 만족하는 상품이 있으면 쿠폰은 enable 상태이며, 가장 비싼 해당 상품 가격만큼 할인된다.', () => {
      // mockCartItems에는 수량 3개 이상인 아이템이 포함되어 있다고 가정 (예: 달 무드등: 2800원, quantity: 3)
      const coupon = new Coupon(bogoCoupon, mockCartItems, false);

      expect(coupon.disable).toBe(false);
      expect(coupon.discountAmount).toBe(2800); // 가장 비싼 조건 만족 상품의 가격
    });

    it('❌ 조건을 만족하는 상품이 없으면 쿠폰은 disable 상태이며 할인 금액은 0이다.', () => {
      // 에어포스2 - 개수 1개, 가격 10,000원
      const insufficientCartItem = [mockCartItems[1]];

      const coupon = new Coupon(bogoCoupon, insufficientCartItem, false);

      expect(coupon.disable).toBe(true);
      expect(coupon.discountAmount).toBe(0);
    });
  });

  describe('FREESHIPPING 쿠폰 테스트', () => {
    const freeShippingCoupon: CouponType = {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 무료배송',
      expirationDate: new Date('2025-08-31'),
      minimumAmount: 50000,
      discountType: 'freeShipping',
    };

    // 에어포스3 - 개수 1개, 가격 50,000원
    const lowOrderItems = [mockCartItems[2]];

    it('✅ 주문금액 10만원 이상 & 도서산간 지역 → 배송비 3000원 할인', () => {
      const coupon = new Coupon(freeShippingCoupon, mockCartItems, true);
      expect(coupon.disable).toBe(false);
      expect(coupon.discountAmount).toBe(3000);
    });

    it('✅ 주문금액 10만원 이상 & 일반 지역 → 배송비 0원 할인', () => {
      const coupon = new Coupon(freeShippingCoupon, mockCartItems, false);
      expect(coupon.disable).toBe(false);
      expect(coupon.discountAmount).toBe(0);
    });

    it('✅ 주문금액 10만원 미만 & 도서산간 지역 → 배송비 6000원 할인', () => {
      const coupon = new Coupon(freeShippingCoupon, lowOrderItems, true);
      expect(coupon.disable).toBe(false);
      expect(coupon.discountAmount).toBe(6000);
    });

    it('✅ 주문금액 10만원 미만 & 일반 지역 → 배송비 3000원원 할인', () => {
      const coupon = new Coupon(freeShippingCoupon, lowOrderItems, false);
      expect(coupon.disable).toBe(false);
      expect(coupon.discountAmount).toBe(3000);
    });
  });

  describe('MIRACLE 쿠폰 테스트', () => {
    const miracleCoupon: CouponType = {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: new Date('2025-07-31'),
      discount: 30,
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      discountType: 'percentage',
    };

    it('✅ 사용 가능한 시간대(05:00)에는 쿠폰이 적용된다.', () => {
      mockDate('2025-06-08T05:00:00');

      const coupon = new Coupon(miracleCoupon, mockCartItems, false);
      expect(coupon.disable).toBe(false);
      expect(Math.round(coupon.discountAmount)).toBe(50520); // 168,400원 * 30%
    });

    it('❌ 사용 불가능한 시간대(03:59)에는 쿠폰이 disable 된다.', () => {
      mockDate('2025-06-08T03:59:00');

      const coupon = new Coupon(miracleCoupon, mockCartItems, false);
      expect(coupon.disable).toBe(true);
      expect(coupon.discountAmount).toBe(0);
    });

    it('❌ 사용 불가능한 시간대(07:01)에는 쿠폰이 disable 된다.', () => {
      mockDate('2025-06-08T07:01:00');

      const coupon = new Coupon(miracleCoupon, mockCartItems, false);
      expect(coupon.disable).toBe(true);
      expect(coupon.discountAmount).toBe(0);
    });
  });
});
