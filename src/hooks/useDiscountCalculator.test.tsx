import { renderHook } from '@testing-library/react';
import useDiscountCalculator from './useDiscountCalculator';
import { mockCouponList } from './useCouponValidator.test';
import {
  mockOrderList,
  mockOrderTotalPrice,
} from './useApplicableCoupons.test';

describe('useDiscountCalculator 테스트', () => {
  describe('discountType이 fixed 일 때', () => {
    it('총 주문 금액이 최소 주문 금액 이상일 때, 할인 금액은 5,000원 이다.', () => {
      const validTotalOrderPrice = 100000;
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[0],
          totalOrderPrice: validTotalOrderPrice,
          orderList: mockOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(5000);
      expect(result.current).not.toBe(0);
    });

    it('총 주문 금액이 최소 주문 금액 미만일 때, 할인 금액은 0원이다.', () => {
      const inValidTotalOrderPrice = 99999;
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[0],
          totalOrderPrice: inValidTotalOrderPrice,
          orderList: mockOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(0);
      expect(result.current).not.toBe(5000);
    });
  });

  describe('discountType이 percentage 일 때', () => {
    it('할인 금액은 총 주문 금액에서 30% 할인된 금액이다.', () => {
      const testTotalOrderPrice = 100000;
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[3],
          totalOrderPrice: testTotalOrderPrice,
          orderList: mockOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(30000);
      expect(result.current).not.toBe(0);
    });
  });

  describe('discountType이 byXgetY 일 때', () => {
    it('주문 상품의 수량이 3개 이상이 존재 하는 것이 1개 일때, 해당 제품의 1개 금액이 할인 금액이다. ', () => {
      const testOrderList = [
        {
          id: 222,
          quantity: 2,
          product: {
            id: 2,
            name: 'Product 2',
            price: 20000,
            imageUrl: '',
            category: 'fashion',
          },
        },
        {
          id: 333,
          quantity: 3,
          product: {
            id: 3,
            name: 'Product 3',
            price: 10000,
            imageUrl: '',
            category: 'fashion',
          },
        },
      ];
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[1],
          totalOrderPrice: mockOrderTotalPrice,
          orderList: testOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(10000);
      expect(result.current).not.toBe(0);
    });

    it('주문 상품의 수량이 3개 이상이 존재 하는 것이 1개 이상 일때, 할인 금액이 가장 큰 상품의 1개 금액이 할인 금액이다. ', () => {
      const testOrderList = [
        {
          id: 222,
          quantity: 2,
          product: {
            id: 2,
            name: 'Product 2',
            price: 20000,
            imageUrl: '',
            category: 'fashion',
          },
        },
        {
          id: 444,
          quantity: 6,
          product: {
            id: 4,
            name: 'Product 4',
            price: 20000,
            imageUrl: '',
            category: 'fashion',
          },
        },
        {
          id: 333,
          quantity: 3,
          product: {
            id: 3,
            name: 'Product 3',
            price: 10000,
            imageUrl: '',
            category: 'fashion',
          },
        },
      ];
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[1],
          totalOrderPrice: mockOrderTotalPrice,
          orderList: testOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(20000);
      expect(result.current).not.toBe(0);
    });
    it('주문 상품의 수량이 3개 이상이 존재 하는 것이 없을 때, 할인 금액은 0원이다. ', () => {
      const testOrderList = [
        {
          id: 222,
          quantity: 2,
          product: {
            id: 2,
            name: 'Product 2',
            price: 20000,
            imageUrl: '',
            category: 'fashion',
          },
        },
        {
          id: 333,
          quantity: 1,
          product: {
            id: 3,
            name: 'Product 3',
            price: 10000,
            imageUrl: '',
            category: 'fashion',
          },
        },
      ];
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[1],
          totalOrderPrice: mockOrderTotalPrice,
          orderList: testOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(0);
      expect(result.current).not.toBe(10000);
    });
  });

  describe('discountType이 freeShipping 일 때', () => {
    it('총 주문 금액이 최소 주문 금액 이상일 때, 할인 금액은 3000원이다.', () => {
      const validTotalOrderPrice = 50000;
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[2],
          totalOrderPrice: validTotalOrderPrice,
          orderList: mockOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(3000);
      expect(result.current).not.toBe(0);
    });

    it('총 주문 금액이 최소 주문 금액 미만일 때, 할인 금액은 0원이다.', () => {
      const validTotalOrderPrice = 49999;
      const { result } = renderHook(() =>
        useDiscountCalculator({
          coupon: mockCouponList[2],
          totalOrderPrice: validTotalOrderPrice,
          orderList: mockOrderList,
        }).calculateDiscountAmount(),
      );

      expect(result.current).toBe(0);
      expect(result.current).not.toBe(3000);
    });
  });
});
