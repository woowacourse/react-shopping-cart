import { isCouponValid } from '@/features/Coupon/utils/validateCoupon';
import { describe, it, expect, vi } from 'vitest';
import { cartItemsForCoupon } from './Cart.data';
import { Coupon } from '@/features/Coupon/types/Coupon.types';

vi.useFakeTimers();

describe('isCouponValid', () => {
  it('FIXED5000 쿠폰은 최소 금액 100000 이상일 때만 유효하다', () => {
    const coupon: Coupon = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2025-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
      checked: false,
      disabled: false,
    };

    expect(
      isCouponValid(coupon, cartItemsForCoupon.fixedValid, {
        isRemoteArea: false,
        totalPrice: 120000,
      })
    ).toBe(true);

    expect(
      isCouponValid(coupon, cartItemsForCoupon.fixedInvalid, {
        isRemoteArea: false,
        totalPrice: 90000,
      })
    ).toBe(false);
  });

  it('BOGO 쿠폰은 최소 구매 수량을 만족해야 유효하다', () => {
    const coupon: Coupon = {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      expirationDate: '2025-06-30',
      buyQuantity: 2,
      getQuantity: 1,
      discountType: 'buyXgetY',
      checked: false,
      disabled: false,
    };

    expect(
      isCouponValid(coupon, cartItemsForCoupon.bogoValid, {
        isRemoteArea: false,
        totalPrice: 0,
      })
    ).toBe(true);

    expect(
      isCouponValid(coupon, cartItemsForCoupon.bogoInvalid, {
        isRemoteArea: false,
        totalPrice: 0,
      })
    ).toBe(false);
  });

  it('FREESHIPPING 쿠폰은 최소 금액 만족 시 유효하다', () => {
    const coupon: Coupon = {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      expirationDate: '2025-08-31',
      minimumAmount: 50000,
      discountType: 'freeShipping',
      checked: false,
      disabled: false,
    };

    expect(
      isCouponValid(coupon, cartItemsForCoupon.freeShippingValid, {
        isRemoteArea: false,
        totalPrice: 60000,
      })
    ).toBe(true);

    expect(
      isCouponValid(coupon, cartItemsForCoupon.freeShippingInvalid, {
        isRemoteArea: false,
        totalPrice: 40000,
      })
    ).toBe(false);
  });

  it('MIRACLESALE 쿠폰은 시간 조건 만족 시 유효하다', () => {
    const coupon: Coupon = {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: '2025-07-31',
      discount: 30,
      discountType: 'percentage',
      checked: false,
      disabled: false,
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
    };

    vi.useFakeTimers();

    // 유효 시간대
    vi.setSystemTime(new Date('2025-06-10T05:30:00'));
    expect(
      isCouponValid(coupon, cartItemsForCoupon.fixedValid, {
        isRemoteArea: false,
        totalPrice: 120000,
      })
    ).toBe(true);

    // 비유효 시간대
    vi.setSystemTime(new Date('2025-06-10T07:30:00'));
    expect(
      isCouponValid(coupon, cartItemsForCoupon.fixedValid, {
        isRemoteArea: false,
        totalPrice: 120000,
      })
    ).toBe(false);

    vi.useRealTimers();
  });

  it('만료된 쿠폰은 무효하다', () => {
    vi.setSystemTime(new Date('2025-12-01T12:00:00'));

    const coupon: Coupon = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2025-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
      checked: false,
      disabled: false,
    };

    expect(
      isCouponValid(coupon, cartItemsForCoupon.fixedValid, {
        isRemoteArea: false,
        totalPrice: 120000,
      })
    ).toBe(false);
  });
});
