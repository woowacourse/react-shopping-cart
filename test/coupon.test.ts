import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateCombos, calcCouponDiscount, findBestCombo } from '../src/utils/coupon';
import { CartProduct, CouponType } from '../src/types/cart';

const mockCurrentTime = (hours: number, minutes: number) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  vi.setSystemTime(date);
};

describe('쿠폰 유틸리티 테스트', () => {
  const mockCartItems: CartProduct[] = [
    {
      id: 1,
      quantity: 2,
      product: { id: 101, name: '상품1', price: 10000, imageUrl: '', category: '식료품' },
    },
    {
      id: 2,
      quantity: 1,
      product: { id: 102, name: '상품2', price: 20000, imageUrl: '', category: '식료품' },
    },
  ];

  const mockCart = {
    total: 40000,
    items: mockCartItems,
    shippingFee: 3000,
    isExtraShippingFee: false,
    totalCount: 3,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('미라클 모닝 쿠폰 테스트', () => {
    const miracleMorningCoupon: CouponType = {
      id: 1,
      code: 'MORNING',
      description: '미라클 모닝 쿠폰',
      discountType: 'percentage',
      discount: 20,
      minimumAmount: 10000,
      expirationDate: '2025-12-31',
      availableTime: { start: '06:00:00', end: '10:00:00' },
    };

    it('미라클 모닝 시간대(06:00-10:00)에 쿠폰이 적용되어야 한다', () => {
      mockCurrentTime(8, 30);
      const discount = calcCouponDiscount(miracleMorningCoupon, mockCart, [1, 2]);
      expect(discount).toBe(8000);
    });

    it('미라클 모닝 시간대가 아닐 때는 쿠폰이 적용되지 않아야 한다', () => {
      mockCurrentTime(11, 0);
      const discount = calcCouponDiscount(miracleMorningCoupon, mockCart, [1, 2]);
      expect(discount).toBe(0);
    });
  });

  describe('쿠폰 조합 테스트', () => {
    const coupons: CouponType[] = [
      {
        id: 1,
        code: 'PERCENT',
        description: '10% 할인',
        discountType: 'percentage',
        discount: 10,
        expirationDate: '2025-12-31',
      },
      {
        id: 2,
        code: 'FREESHIP',
        description: '무료 배송',
        discountType: 'freeShipping',
        expirationDate: '2025-12-31',
      },
      {
        id: 3,
        code: 'FIXED',
        description: '5,000원 할인',
        discountType: 'fixed',
        discount: 5000,
        expirationDate: '2025-12-31',
      },
    ];

    it('가장 큰 할인 조합이 적용되어야 한다', () => {
      const combos = generateCombos(coupons, 2);

      const bestDiscount = findBestCombo(combos, mockCart, [3, 1]);

      expect(bestDiscount).toBe(9000);
    });
  });

  describe('generateCombos 테스트', () => {
    it('최대 2개의 쿠폰 조합을 생성해야 한다', () => {
      const coupons: CouponType[] = [
        {
          id: 1,
          code: 'TEST1',
          description: '쿠폰1',
          discountType: 'fixed',
          discount: 1000,
          expirationDate: '2025-12-31',
        },
        {
          id: 2,
          code: 'TEST2',
          description: '쿠폰2',
          discountType: 'fixed',
          discount: 2000,
          expirationDate: '2025-12-31',
        },
        {
          id: 3,
          code: 'TEST3',
          description: '쿠폰3',
          discountType: 'fixed',
          discount: 3000,
          expirationDate: '2025-12-31',
        },
      ];

      const combos = generateCombos(coupons, 2);
      expect(combos).toHaveLength(6);
      expect(combos.every((combo) => combo.length <= 2)).toBe(true);
    });
  });
});
