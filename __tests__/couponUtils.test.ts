// src/features/coupons/utils/__tests__/couponUtils.test.ts
import { describe, it, expect } from 'vitest';
import { calculateCouponDiscount } from '../src/components/Modal/utils/calculateCouponDiscount';
import { isCouponEnabled } from '../src/components/Modal/utils/isCouponEnabled';
import { getBestCoupons } from '../src/components/Modal/utils/getBestCoupons';
import cartItems from '../src/mocks/data/cartItems.json';
import coupons from '../src/mocks/data/coupons.json';
import { FixedCoupon, FreeShippingCoupon, PercentageCoupon, BuyXGetYCoupon, Coupon } from '../src/types/coupon';
import { CartItemType } from '../src/types/cartItem';

const sampleItems = cartItems.content;
const baseDate = new Date(2025, 5, 15, 5, 0, 0);
const fixedCoupon = coupons.find((c) => c.discountType === 'fixed') as FixedCoupon;
const freeShippingCoupon = coupons.find((c) => c.discountType === 'freeShipping') as FreeShippingCoupon;
const percentageCoupon = coupons.find((c) => c.discountType === 'percentage') as PercentageCoupon;
const buyXgetYCoupon = coupons.find((c) => c.discountType === 'buyXgetY') as BuyXGetYCoupon;

describe('calculateCouponDiscount()', () => {
  it('fixed 타입은 discount 값을 그대로 반환한다.', () => {
    expect(calculateCouponDiscount({ coupon: fixedCoupon, orderAmount: 200_000, items: sampleItems })).toBe(5000);
  });

  it('percentage 타입은 주문금액 * (discount/100)을 내림한다.', () => {
    expect(calculateCouponDiscount({ coupon: percentageCoupon, orderAmount: 123_456, items: sampleItems })).toBe(
      Math.floor(123_456 * 0.3)
    );
  });

  it('buyXgetY 타입은 최고가 상품 가격 * getQuantity를 반환한다.', () => {
    expect(calculateCouponDiscount({ coupon: buyXgetYCoupon, orderAmount: 0, items: sampleItems })).toBe(
      300_000_000 * 1
    );
  });

  it('items가 비어있으면 buyXgetY 는 0을 반환한다.', () => {
    const coupon = coupons.find((c) => c.discountType === 'buyXgetY') as BuyXGetYCoupon;
    expect(calculateCouponDiscount({ coupon, orderAmount: 0, items: [] })).toBe(0);
  });
});

describe('isCouponDisabled()', () => {
  const baseDate = new Date(2025, 5, 15, 5, 0, 0);

  it('만료일이 지나면 비활성화된다.', () => {
    const expired = { ...fixedCoupon, expirationDate: '2025-01-01' } as Coupon;
    expect(isCouponEnabled({ coupon: expired, orderAmount: 200_000, items: sampleItems, now: baseDate })).toBe(false);
  });

  it('fixed/무료배송은 최소 주문금액 미만이면 비활성화된다.', () => {
    expect(isCouponEnabled({ coupon: fixedCoupon, orderAmount: 90_000, items: [], now: baseDate })).toBe(false);
    expect(isCouponEnabled({ coupon: freeShippingCoupon, orderAmount: 40_000, items: [], now: baseDate })).toBe(false);
  });

  it('fixed/무료배송은 최소 주문금액 이상이면 활성화된다.', () => {
    expect(isCouponEnabled({ coupon: fixedCoupon, orderAmount: 100_000, items: [], now: baseDate })).toBe(true);
    expect(isCouponEnabled({ coupon: freeShippingCoupon, orderAmount: 50_000, items: [], now: baseDate })).toBe(true);
  });

  it('percentage 타입은 availableTime 외에는 비활성화된다.', () => {
    const before = new Date(2025, 5, 15, 3, 59, 59);
    const after = new Date(2025, 5, 15, 7, 0, 1);
    expect(isCouponEnabled({ coupon: percentageCoupon, orderAmount: 200_000, items: sampleItems, now: before })).toBe(
      false
    );
    expect(isCouponEnabled({ coupon: percentageCoupon, orderAmount: 200_000, items: sampleItems, now: after })).toBe(
      false
    );
    expect(isCouponEnabled({ coupon: percentageCoupon, orderAmount: 200_000, items: sampleItems, now: baseDate })).toBe(
      true
    );
  });

  it('buyXgetY 타입은 (buy+get) 수량 미만이면 비활성화된다.', () => {
    const fewItems = [{ id: 1, quantity: 2, product: { price: 1000 } }] as CartItemType[];
    expect(isCouponEnabled({ coupon: buyXgetYCoupon, orderAmount: 0, items: fewItems, now: baseDate })).toBe(false);
  });

  it('buyXgetY 타입은 수량 조건을 만족하면 활성화된다.', () => {
    const enough = [{ id: 1, quantity: 3, product: { price: 1000 } }] as CartItemType[];
    expect(isCouponEnabled({ coupon: buyXgetYCoupon, orderAmount: 0, items: enough, now: baseDate })).toBe(true);
  });
});

describe('getBestCoupons()', () => {
  it('유효한 쿠폰 중 가장 큰 할인 2개를 반환한다 (시간 내).', () => {
    const best = getBestCoupons({
      coupons: coupons as Coupon[],
      orderAmount: 100_000,
      items: sampleItems,
      now: baseDate
    });
    expect(best.map((c) => c.code)).toEqual(['BOGO', 'MIRACLESALE']);
  });

  it('시간 외 MIRACLESALE 은 제외되고, 그 다음 2개를 반환한다.', () => {
    const offTime = new Date(2025, 5, 15, 8, 0, 0);
    const best = getBestCoupons({
      coupons: coupons as Coupon[],
      orderAmount: 100_000,
      items: sampleItems,
      now: offTime
    });
    expect(best.map((c) => c.code)).toEqual(['BOGO', 'FIXED5000']);
  });

  it('전체 쿠폰이 비활성화되면 빈 배열을 반환한다.', () => {
    const offTime = new Date(2025, 5, 15, 8, 0, 0);
    const best = getBestCoupons({ coupons: coupons as Coupon[], orderAmount: 10_000, items: [], now: offTime });
    expect(best).toEqual([]);
    expect(best).toHaveLength(0);
  });
});
