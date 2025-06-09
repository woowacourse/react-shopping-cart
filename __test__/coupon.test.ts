import { describe, it, expect } from 'vitest';
import {
  isCouponApplicable,
  calculateFixedDiscount,
  calculateBuyXGetYDiscount,
  calculateShippingDiscount,
  calculatePercentageDiscount,
  calculateCouponDiscount,
  calculateOptimalCouponDiscount,
} from '../src/features/coupon/utils/business';
import { Coupon } from '../src/features/coupon/types/coupon';
import { CartItem } from '../src/features/cart/types/cart';

const createFixedCoupon = (): Coupon => ({
  id: 1,
  code: 'FIXED5000',
  description: '5,000원 할인 쿠폰',
  discountType: 'fixed',
  discount: 5000,
  minimumAmount: 100000,
  expirationDate: '2025-11-30',
});

const createBogoCoupon = (): Coupon => ({
  id: 2,
  code: 'BOGO',
  description: '2+1 쿠폰',
  discountType: 'buyXgetY',
  buyQuantity: 2,
  getQuantity: 1,
  expirationDate: '2025-06-30',
});

const createFreeShippingCoupon = (): Coupon => ({
  id: 3,
  code: 'FREESHIPPING',
  description: '무료 배송 쿠폰',
  discountType: 'freeShipping',
  minimumAmount: 50000,
  expirationDate: '2025-08-31',
});

const createMiracleSaleCoupon = (): Coupon => ({
  id: 4,
  code: 'MIRACLESALE',
  description: '30% 시간제 할인 쿠폰',
  discountType: 'percentage',
  discount: 30,
  availableTime: { start: '04:00', end: '07:00' },
  expirationDate: '2025-07-31',
});

const createCartItem = (id: number, quantity: number, price: number): CartItem => ({
  id,
  quantity,
  product: {
    id,
    name: `상품 ${id}`,
    price,
    imageUrl: `image-${id}.jpg`,
    category: '카테고리',
  },
});

describe('쿠폰 유효성 검증 (isCouponApplicable)', () => {
  describe('고정 할인 쿠폰 (FIXED5000)', () => {
    const fixedCoupon = createFixedCoupon();

    it('최소 주문 금액 이상일 때 적용 가능', () => {
      expect(isCouponApplicable(fixedCoupon, [], 100000)).toBe(true);
      expect(isCouponApplicable(fixedCoupon, [], 150000)).toBe(true);
    });

    it('최소 주문 금액 미만일 때 적용 불가 (경계값 테스트)', () => {
      expect(isCouponApplicable(fixedCoupon, [], 99999)).toBe(false);
      expect(isCouponApplicable(fixedCoupon, [], 50000)).toBe(false);
    });

    it('정확히 최소 주문 금액일 때 적용 가능 (경계값)', () => {
      expect(isCouponApplicable(fixedCoupon, [], 100000)).toBe(true);
    });
  });

  describe('2+1 쿠폰 (BOGO)', () => {
    const bogoCoupon = createBogoCoupon();

    it('2+1 조건을 만족하는 상품이 있을 때 적용 가능', () => {
      const items = [createCartItem(1, 3, 10000)];
      expect(isCouponApplicable(bogoCoupon, items, 30000)).toBe(true);
    });

    it('2+1 조건을 만족하지 않을 때 적용 불가 (경계값 테스트)', () => {
      const items = [createCartItem(1, 2, 10000)];
      expect(isCouponApplicable(bogoCoupon, items, 20000)).toBe(false);
    });

    it('정확히 3개일 때 적용 가능 (경계값)', () => {
      const items = [createCartItem(1, 3, 10000)];
      expect(isCouponApplicable(bogoCoupon, items, 30000)).toBe(true);
    });

    it('여러 상품 중 하나라도 조건을 만족하면 적용 가능', () => {
      const items = [createCartItem(1, 2, 10000), createCartItem(2, 3, 15000)];
      expect(isCouponApplicable(bogoCoupon, items, 45000)).toBe(true);
    });
  });

  describe('무료 배송 쿠폰 (FREESHIPPING)', () => {
    const freeShippingCoupon = createFreeShippingCoupon();

    it('최소 주문 금액 이상이고 10만원 미만일 때 적용 가능', () => {
      expect(isCouponApplicable(freeShippingCoupon, [], 50000)).toBe(true);
      expect(isCouponApplicable(freeShippingCoupon, [], 80000)).toBe(true);
    });

    it('최소 주문 금액 미만일 때 적용 불가 (경계값 테스트)', () => {
      expect(isCouponApplicable(freeShippingCoupon, [], 49999)).toBe(false);
    });

    it('10만원 이상일 때 적용 불가 (이미 무료 배송)', () => {
      expect(isCouponApplicable(freeShippingCoupon, [], 100000)).toBe(false);
      expect(isCouponApplicable(freeShippingCoupon, [], 150000)).toBe(false);
    });

    it('경계값 테스트: 정확히 5만원과 10만원', () => {
      expect(isCouponApplicable(freeShippingCoupon, [], 50000)).toBe(true);
      expect(isCouponApplicable(freeShippingCoupon, [], 99999)).toBe(true);
      expect(isCouponApplicable(freeShippingCoupon, [], 100000)).toBe(false);
    });
  });

  describe('30% 시간제 할인 쿠폰 (MIRACLESALE)', () => {
    const miracleSaleCoupon = createMiracleSaleCoupon();

    it('적용 시간대(4시-7시)에 적용 가능', () => {
      const validTimes = [
        new Date('2024-01-01T04:00:00'),
        new Date('2024-01-01T05:30:00'),
        new Date('2024-01-01T06:59:59'),
      ];

      validTimes.forEach((time) => {
        expect(isCouponApplicable(miracleSaleCoupon, [], 50000, time)).toBe(true);
      });
    });

    it('적용 시간대 외에는 적용 불가 (경계값 테스트)', () => {
      const invalidTimes = [
        new Date('2024-01-01T03:59:59'),
        new Date('2024-01-01T07:00:00'),
        new Date('2024-01-01T07:00:01'),
        new Date('2024-01-01T12:00:00'),
        new Date('2024-01-01T23:59:59'),
      ];

      invalidTimes.forEach((time) => {
        expect(isCouponApplicable(miracleSaleCoupon, [], 50000, time)).toBe(false);
      });
    });

    it('경계값 테스트: 정확히 4시와 7시', () => {
      expect(isCouponApplicable(miracleSaleCoupon, [], 50000, new Date('2024-01-01T04:00:00'))).toBe(true);
      expect(isCouponApplicable(miracleSaleCoupon, [], 50000, new Date('2024-01-01T06:59:59'))).toBe(true);
      expect(isCouponApplicable(miracleSaleCoupon, [], 50000, new Date('2024-01-01T07:00:00'))).toBe(false);
    });
  });
});

describe('쿠폰 할인 계산', () => {
  describe('고정 할인 계산 (calculateFixedDiscount)', () => {
    const fixedCoupon = createFixedCoupon();

    it('조건을 만족할 때 정확한 할인 금액 반환', () => {
      expect(calculateFixedDiscount(fixedCoupon, 100000)).toBe(5000);
      expect(calculateFixedDiscount(fixedCoupon, 200000)).toBe(5000);
    });

    it('최소 주문 금액 미만일 때 0 반환', () => {
      expect(calculateFixedDiscount(fixedCoupon, 99999)).toBe(0);
    });
  });

  describe('2+1 할인 계산 (calculateBuyXGetYDiscount)', () => {
    const bogoCoupon = createBogoCoupon();

    it('가장 비싼 상품에 대해 할인 적용', () => {
      const items = [createCartItem(1, 3, 10000), createCartItem(2, 3, 20000)];
      expect(calculateBuyXGetYDiscount(bogoCoupon, items)).toBe(20000);
    });

    it('여러 세트가 가능할 때 모든 세트에 대해 할인', () => {
      const items = [createCartItem(1, 6, 10000)];
      expect(calculateBuyXGetYDiscount(bogoCoupon, items)).toBe(20000);
    });

    it('조건을 만족하지 않을 때 0 반환', () => {
      const items = [createCartItem(1, 2, 10000)];
      expect(calculateBuyXGetYDiscount(bogoCoupon, items)).toBe(0);
    });

    it('경계값 테스트: 정확히 3개일 때', () => {
      const items = [createCartItem(1, 3, 10000)];
      expect(calculateBuyXGetYDiscount(bogoCoupon, items)).toBe(10000);
    });
  });

  describe('배송비 할인 계산 (calculateShippingDiscount)', () => {
    const freeShippingCoupon = createFreeShippingCoupon();

    it('조건을 만족할 때 배송비 전액 할인', () => {
      expect(calculateShippingDiscount(freeShippingCoupon, 60000, 3000)).toBe(3000);
      expect(calculateShippingDiscount(freeShippingCoupon, 60000, 6000)).toBe(6000);
    });

    it('최소 주문 금액 미만일 때 0 반환', () => {
      expect(calculateShippingDiscount(freeShippingCoupon, 40000, 3000)).toBe(0);
    });
  });

  describe('퍼센트 할인 계산 (calculatePercentageDiscount)', () => {
    const miracleSaleCoupon = createMiracleSaleCoupon();

    it('적용 시간대에 정확한 할인 금액 계산', () => {
      const validTime = new Date('2024-01-01T05:00:00');
      expect(calculatePercentageDiscount(miracleSaleCoupon, 100000, validTime)).toBe(30000);
      expect(calculatePercentageDiscount(miracleSaleCoupon, 50000, validTime)).toBe(15000);
    });

    it('소수점 이하 버림 처리', () => {
      const validTime = new Date('2024-01-01T05:00:00');
      expect(calculatePercentageDiscount(miracleSaleCoupon, 10001, validTime)).toBe(3000);
    });

    it('적용 시간대 외에는 0 반환', () => {
      const invalidTime = new Date('2024-01-01T08:00:00');
      expect(calculatePercentageDiscount(miracleSaleCoupon, 100000, invalidTime)).toBe(0);
    });
  });
});

describe('단일 쿠폰 할인 계산 (calculateCouponDiscount)', () => {
  const items = [createCartItem(1, 3, 20000)];
  const orderPrice = 60000;
  const shippingFee = 3000;

  it('각 쿠폰 타입별로 정확한 할인 계산', () => {
    expect(calculateCouponDiscount(createFixedCoupon(), items, 100000, shippingFee)).toBe(5000);
    expect(calculateCouponDiscount(createBogoCoupon(), items, orderPrice, shippingFee)).toBe(20000);
    expect(calculateCouponDiscount(createFreeShippingCoupon(), items, orderPrice, shippingFee)).toBe(3000);

    const validTime = new Date('2024-01-01T05:00:00');
    expect(calculateCouponDiscount(createMiracleSaleCoupon(), items, orderPrice, shippingFee, validTime)).toBe(18000);
  });
});

describe('최적 쿠폰 조합 계산 (calculateOptimalCouponDiscount)', () => {
  const items = [createCartItem(1, 3, 20000), createCartItem(2, 2, 30000)];
  const orderPrice = 120000;
  const shippingFee = 3000;
  const validTime = new Date('2024-01-01T05:00:00');

  it('쿠폰이 없을 때 0 반환', () => {
    const result = calculateOptimalCouponDiscount([], items, orderPrice, shippingFee);
    expect(result.totalDiscount).toBe(0);
    expect(result.appliedCoupons).toEqual([]);
  });

  it('단일 쿠폰일 때 해당 쿠폰 할인 적용', () => {
    const coupons = [createFixedCoupon()];
    const result = calculateOptimalCouponDiscount(coupons, items, orderPrice, shippingFee);
    expect(result.totalDiscount).toBe(5000);
    expect(result.appliedCoupons).toEqual(coupons);
  });

  it('두 쿠폰 조합에서 최적 순서 선택', () => {
    const coupons = [createFixedCoupon(), createMiracleSaleCoupon()];
    const result = calculateOptimalCouponDiscount(coupons, items, orderPrice, shippingFee, validTime);

    expect(result.totalDiscount).toBe(39500);
  });

  it('배송비 쿠폰과 다른 쿠폰의 조합', () => {
    const items2 = [createCartItem(1, 2, 30000)];
    const coupons = [createFreeShippingCoupon(), createMiracleSaleCoupon()];
    const result = calculateOptimalCouponDiscount(coupons, items2, 60000, shippingFee, validTime);

    expect(result.totalDiscount).toBe(20100);
  });

  it('2+1 쿠폰과 고정할인 쿠폰의 조합', () => {
    const coupons = [createBogoCoupon(), createFixedCoupon()];
    const result = calculateOptimalCouponDiscount(coupons, items, orderPrice, shippingFee);

    expect(result.totalDiscount).toBe(25000);
  });
});

describe('복합 시나리오 테스트', () => {
  it('모든 쿠폰 조건을 만족하는 고액 주문', () => {
    const items = [createCartItem(1, 6, 25000), createCartItem(2, 3, 20000)];
    const orderPrice = 210000;
    const shippingFee = 6000;
    const validTime = new Date('2024-01-01T05:00:00');

    const allCoupons = [createFixedCoupon(), createBogoCoupon(), createFreeShippingCoupon(), createMiracleSaleCoupon()];

    const combinations = [
      [allCoupons[0], allCoupons[1]],
      [allCoupons[0], allCoupons[2]],
      [allCoupons[0], allCoupons[3]],
      [allCoupons[1], allCoupons[2]],
      [allCoupons[1], allCoupons[3]],
      [allCoupons[2], allCoupons[3]],
    ];

    const results = combinations.map((combo) =>
      calculateOptimalCouponDiscount(combo, items, orderPrice, shippingFee, validTime)
    );

    const maxDiscount = Math.max(...results.map((r) => r.totalDiscount));
    expect(maxDiscount).toBeGreaterThan(0);
  });

  it('경계값 상황: 정확히 조건을 만족하는 경우', () => {
    const items = [createCartItem(1, 5, 20000)];
    const orderPrice = 100000;

    expect(isCouponApplicable(createFixedCoupon(), items, orderPrice)).toBe(true);
    expect(calculateFixedDiscount(createFixedCoupon(), orderPrice)).toBe(5000);
  });

  it('시간 경계값: 적용 시간 경계에서의 동작', () => {
    const miracleCoupon = createMiracleSaleCoupon();
    const orderPrice = 50000;

    expect(isCouponApplicable(miracleCoupon, [], orderPrice, new Date('2024-01-01T03:59:59'))).toBe(false);
    expect(isCouponApplicable(miracleCoupon, [], orderPrice, new Date('2024-01-01T04:00:00'))).toBe(true);

    expect(isCouponApplicable(miracleCoupon, [], orderPrice, new Date('2024-01-01T06:59:59'))).toBe(true);
    expect(isCouponApplicable(miracleCoupon, [], orderPrice, new Date('2024-01-01T07:00:00'))).toBe(false);
  });

  it('수량 경계값: 2+1 쿠폰 적용 경계', () => {
    const bogoCoupon = createBogoCoupon();

    expect(isCouponApplicable(bogoCoupon, [createCartItem(1, 2, 10000)], 20000)).toBe(false);
    expect(isCouponApplicable(bogoCoupon, [createCartItem(1, 3, 10000)], 30000)).toBe(true);

    expect(calculateBuyXGetYDiscount(bogoCoupon, [createCartItem(1, 3, 10000)])).toBe(10000);
    expect(calculateBuyXGetYDiscount(bogoCoupon, [createCartItem(1, 6, 10000)])).toBe(20000);
  });
});
