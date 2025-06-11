import { describe, it, expect, vi } from 'vitest';
import { couponUsableCalculators } from '../src/components/features/orderConfirm/utils/couponUsableCalculators';
import { CartItemType } from '../src/components/features/cart/types';
import { CouponType } from '../src/components/features/orderConfirm/types';

describe('couponUsableCalculators', () => {
  const mockCartItems: CartItemType[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: '상품1',
        price: 10000,
        imageUrl: 'test.jpg',
        category: '음식',
      },
      quantity: 3,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: '상품2',
        price: 15000,
        imageUrl: 'test2.jpg',
        category: '음식',
      },
      quantity: 1,
    },
  ];

  it('fixed: 최소 주문 금액 이상이면 true, 아니면 false', () => {
    const coupon: CouponType = {
      id: 1,
      code: 'FIXED5000',
      description: '고정 할인 쿠폰',
      expirationDate: '2024-12-31',
      discountType: 'fixed',
      discount: 5000,
      minimumAmount: 10000,
    };
    expect(couponUsableCalculators.fixed(coupon, mockCartItems, 40000)).toBe(
      true
    );
    expect(couponUsableCalculators.fixed(coupon, mockCartItems, 5000)).toBe(
      false
    );
  });

  it('freeShipping: 최소 주문 금액 이상이면 true, 아니면 false', () => {
    const coupon: CouponType = {
      id: 1,
      code: 'FREESHIP',
      description: '무료 배송 쿠폰',
      expirationDate: '2024-12-31',
      discountType: 'freeShipping',
      minimumAmount: 10000,
    };
    expect(
      couponUsableCalculators.freeShipping(coupon, mockCartItems, 40000)
    ).toBe(true);
    expect(
      couponUsableCalculators.freeShipping(coupon, mockCartItems, 5000)
    ).toBe(false);
  });

  it('buyXgetY: 조건 만족하면 true, 아니면 false', () => {
    const coupon: CouponType = {
      id: 1,
      code: 'BUY2GET1',
      description: 'X개 구매시 Y개 무료',
      expirationDate: '2024-12-31',
      discountType: 'buyXgetY',
      buyQuantity: 2,
      getQuantity: 1,
    };
    expect(couponUsableCalculators.buyXgetY(coupon, mockCartItems, 0)).toBe(
      true
    );
    const coupon2: CouponType = {
      ...coupon,
      buyQuantity: 5,
    };
    expect(couponUsableCalculators.buyXgetY(coupon2, mockCartItems, 0)).toBe(
      false
    );
  });

  it('percentage: 사용 가능 시간 내면 true, 아니면 false', () => {
    const coupon: CouponType = {
      id: 1,
      code: 'PERCENT10',
      description: '퍼센트 할인 쿠폰',
      expirationDate: '2024-12-31',
      discountType: 'percentage',
      discount: 10,
      availableTime: {
        start: '09:00:00',
        end: '18:00:00',
      },
    };
    vi.setSystemTime(new Date('2024-01-01T10:00:00'));
    expect(couponUsableCalculators.percentage(coupon, mockCartItems, 0)).toBe(
      true
    );
    vi.setSystemTime(new Date('2024-01-01T20:00:00'));
    expect(couponUsableCalculators.percentage(coupon, mockCartItems, 0)).toBe(
      false
    );
    vi.useRealTimers();
  });
});
