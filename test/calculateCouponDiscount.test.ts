import { describe, it, expect } from 'vitest';
import { calculateCouponDiscount } from '../src/components/features/orderConfirm/utils/calculateCouponDiscount';
import { CartItemType } from '../src/components/features/cart/types';
import { CouponType } from '../src/components/features/orderConfirm/types';

describe('calculateCouponDiscount', () => {
  const mockProducts: CartItemType[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: '상품1',
        price: 10000,
        imageUrl: 'test.jpg',
        category: '음식',
      },
      quantity: 2,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: '상품2',
        price: 20000,
        imageUrl: 'test2.jpg',
        category: '음식',
      },
      quantity: 1,
    },
  ];

  describe('fixed 타입 쿠폰', () => {
    it('최소 주문 금액을 만족할 경우 고정 할인 금액을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'FIXED5000',
        description: '고정 할인 쿠폰',
        expirationDate: '2024-12-31',
        discountType: 'fixed',
        discount: 5000,
        minimumAmount: 10000,
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(5000);
    });

    it('최소 주문 금액을 만족하지 못할 경우 0을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'FIXED5000',
        description: '고정 할인 쿠폰',
        expirationDate: '2024-12-31',
        discountType: 'fixed',
        discount: 5000,
        minimumAmount: 50000,
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(0);
    });
  });

  describe('percentage 타입 쿠폰', () => {
    it('사용 가능 시간 내에 사용할 경우 퍼센트 할인 금액을 반환한다', () => {
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

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(4000);
    });

    it('사용 가능 시간이 아닐 경우 0을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'PERCENT10',
        description: '퍼센트 할인 쿠폰',
        expirationDate: '2024-12-31',
        discountType: 'percentage',
        discount: 10,
        availableTime: {
          start: '18:00:00',
          end: '09:00:00',
        },
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(0);
    });
  });

  describe('buyXgetY 타입 쿠폰', () => {
    it('구매 수량 조건을 만족하는 상품이 있을 경우 가장 비싼 상품의 가격을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'BUY2GET1',
        description: 'X개 구매시 Y개 무료',
        expirationDate: '2024-12-31',
        discountType: 'buyXgetY',
        buyQuantity: 2,
        getQuantity: 1,
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(10000);
    });

    it('구매 수량 조건을 만족하는 상품이 없을 경우 0을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'BUY2GET1',
        description: 'X개 구매시 Y개 무료',
        expirationDate: '2024-12-31',
        discountType: 'buyXgetY',
        buyQuantity: 3,
        getQuantity: 1,
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(0);
    });
  });

  describe('freeShipping 타입 쿠폰', () => {
    it('최소 주문 금액을 만족하고 제주도가 아닐 경우 3000원을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'FREESHIP',
        description: '무료 배송 쿠폰',
        expirationDate: '2024-12-31',
        discountType: 'freeShipping',
        minimumAmount: 10000,
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(3000);
    });

    it('최소 주문 금액을 만족하고 제주도일 경우 6000원을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'FREESHIP',
        description: '무료 배송 쿠폰',
        expirationDate: '2024-12-31',
        discountType: 'freeShipping',
        minimumAmount: 10000,
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, true);
      expect(discount).toBe(6000);
    });

    it('최소 주문 금액을 만족하지 못할 경우 0을 반환한다', () => {
      const coupon: CouponType = {
        id: 1,
        code: 'FREESHIP',
        description: '무료 배송 쿠폰',
        expirationDate: '2024-12-31',
        discountType: 'freeShipping',
        minimumAmount: 50000,
      };

      const discount = calculateCouponDiscount(coupon, mockProducts, false);
      expect(discount).toBe(0);
    });
  });
});
