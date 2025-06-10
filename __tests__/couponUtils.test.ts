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

describe('calculateCouponDiscount()', () => {
  it('fixed 타입은 discount 값을 그대로 반환한다.', () => {
    const c = coupons[0] as FixedCoupon;
    expect(calculateCouponDiscount(c, 200_000, sampleItems)).toBe(5000);
  });

  it('freeShipping 타입은 deliveryFee를 반환한다.', () => {
    const c = coupons[2] as FreeShippingCoupon;
    expect(calculateCouponDiscount(c, 60_000, sampleItems)).toBe(6000);
  });

  it('percentage 타입은 주문금액 * (discount/100)을 내림한다.', () => {
    const c = coupons[3] as PercentageCoupon;
    expect(calculateCouponDiscount(c, 123_456, sampleItems)).toBe(Math.floor(123_456 * 0.3));
  });

  it('buyXgetY 타입은 최고가 상품 가격 * getQuantity를 반환한다.', () => {
    const c = coupons[1] as BuyXGetYCoupon;
    expect(calculateCouponDiscount(c, 0, sampleItems)).toBe(300_000_000 * 1);
  });

  it('items가 비어있으면 buyXgetY 는 0을 반환한다.', () => {
    const c = coupons[1] as BuyXGetYCoupon;
    expect(calculateCouponDiscount(c, 0, [])).toBe(0);
  });
});

describe('isCouponDisabled()', () => {
  const baseDate = new Date(2025, 5, 15, 5, 0, 0);

  it('만료일이 지나면 비활성화된다.', () => {
    const expired = { ...coupons[0], expirationDate: '2025-01-01' } as PercentageCoupon;
    expect(isCouponEnabled({ coupon: expired, orderAmount: 200_000, items: sampleItems, now: baseDate })).toBe(false);
  });

  it('fixed/무료배송은 최소 주문금액 미만이면 비활성화된다.', () => {
    expect(isCouponEnabled({ coupon: coupons[0] as FixedCoupon, orderAmount: 90_000, items: [], now: baseDate })).toBe(
      false
    );
    expect(
      isCouponEnabled({ coupon: coupons[2] as FreeShippingCoupon, orderAmount: 40_000, items: [], now: baseDate })
    ).toBe(false);
  });

  it('fixed/무료배송은 최소 주문금액 이상이면 활성화된다.', () => {
    expect(isCouponEnabled({ coupon: coupons[0] as FixedCoupon, orderAmount: 100_000, items: [], now: baseDate })).toBe(
      true
    );
    expect(
      isCouponEnabled({ coupon: coupons[2] as FreeShippingCoupon, orderAmount: 50_000, items: [], now: baseDate })
    ).toBe(true);
  });

  it('percentage 타입은 availableTime 외에는 비활성화된다.', () => {
    const coupon = coupons[3] as PercentageCoupon;
    const before = new Date(2025, 5, 15, 3, 59, 59);
    const after = new Date(2025, 5, 15, 7, 0, 1);
    expect(isCouponEnabled({ coupon, orderAmount: 200_000, items: sampleItems, now: before })).toBe(false);
    expect(isCouponEnabled({ coupon, orderAmount: 200_000, items: sampleItems, now: after })).toBe(false);
    expect(isCouponEnabled({ coupon, orderAmount: 200_000, items: sampleItems, now: baseDate })).toBe(true);
  });

  it('buyXgetY 타입은 (buy+get) 수량 미만이면 비활성화된다.', () => {
    const c = coupons[1] as BuyXGetYCoupon;
    const fewItems = [{ id: 1, quantity: 2, product: { price: 1000 } }] as CartItemType[];
    expect(isCouponEnabled({ coupon: c, orderAmount: 0, items: fewItems, now: baseDate })).toBe(false);
  });

  it('buyXgetY 타입은 수량 조건을 만족하면 활성화된다.', () => {
    const c = coupons[1] as BuyXGetYCoupon;
    const enough = [{ id: 1, quantity: 3, product: { price: 1000 } }] as CartItemType[];
    expect(isCouponEnabled({ coupon: c, orderAmount: 0, items: enough, now: baseDate })).toBe(true);
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
