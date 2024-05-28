import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import findApplicableCoupons from '../domain/findApplicableCoupons';
import {
  MOCK_ORDER_LIST,
  MOCK_ORDER_TOTAL_PRICE,
  MOCK_COUPON_LIST,
} from '../constants/mock';

describe('findApplicableCoupons', () => {
  describe('checkOrderAmountCoupons: 최소 주문 금액', () => {
    it('totalPrice가 minimumAmount 보다 크면 true를 반환한다.', () => {
      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: MOCK_ORDER_TOTAL_PRICE,
          orderList: MOCK_ORDER_LIST,
        }).checkOrderAmountCoupons(MOCK_COUPON_LIST[0].minimumAmount!),
      );

      expect(result.current).toBe(true);
    });

    it('totalPrice가 minimumAmount 보다 작다면 false를 반환한다.', () => {
      const invalidTotalPrice = 30000;
      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: invalidTotalPrice,
          orderList: MOCK_ORDER_LIST,
        }).checkOrderAmountCoupons(MOCK_COUPON_LIST[0].minimumAmount!),
      );

      expect(result.current).toBe(false);
    });
  });
  describe('checkMiracleMorningCoupon: 쿠폰 사용 시간', () => {
    beforeAll(() => {
      vi.useFakeTimers();
    });

    it('유저가 접속한 시간이 availableTime 사이에 존재한다면 true를 반환한다.', () => {
      const testTime = new Date('2023-05-01T06:00:00');
      vi.setSystemTime(testTime);

      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: MOCK_ORDER_TOTAL_PRICE,
          orderList: MOCK_ORDER_LIST,
        }).checkMiracleMorningCoupon(MOCK_COUPON_LIST[3].availableTime!),
      );

      expect(result.current).toBe(true);

      vi.useRealTimers();
    });

    it('유저가 접속한 시간이 availableTime 사이에 존재하지 않는다면 false를 반환한다.', () => {
      const testTime = new Date('2023-05-01T10:00:00');
      vi.setSystemTime(testTime);

      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: MOCK_ORDER_TOTAL_PRICE,
          orderList: MOCK_ORDER_LIST,
        }).checkMiracleMorningCoupon(MOCK_COUPON_LIST[3].availableTime!),
      );

      expect(result.current).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('checkBulkPurchaseCoupon: 최소 주문 수량 (2 + 1)', () => {
    it('주문 상품 중 하나라도 주문 수량이 3개 이상이 존재한다면 true를 반환한다.', () => {
      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: MOCK_ORDER_TOTAL_PRICE,
          orderList: MOCK_ORDER_LIST,
        }).checkBulkPurchaseCoupon(),
      );

      expect(result.current).toBe(true);
    });

    it('주문 상품 중 하나라도 주문 수량이 3개 이상이 존재하지 않는다면 false를 반환한다.', () => {
      const invalidOrderList: Cart[] = [MOCK_ORDER_LIST[0]];
      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: MOCK_ORDER_TOTAL_PRICE,
          orderList: invalidOrderList,
        }).checkBulkPurchaseCoupon(),
      );

      expect(result.current).toBe(false);
    });
  });

  describe('사용 가능한 쿠폰 리스트만 반환 테스트', () => {
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2023-05-01T06:00:00'));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('미라클모닝 할인 쿠폰을 사용하지 못해, 사용 가능한 쿠폰의 리스트는 3개이다.', () => {
      const notUseMiracleCouponTime = new Date('2023-05-01T10:00:00');
      vi.setSystemTime(notUseMiracleCouponTime);

      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: MOCK_ORDER_TOTAL_PRICE,
          orderList: MOCK_ORDER_LIST,
        }).applicableCoupons(),
      );

      expect(result.current.length).toBe(3);

      vi.setSystemTime(new Date('2023-05-01T06:00:00'));
    });

    it('구매 금액이 4만원으로, 무료 배송 쿠폰과 5,000원 할인 쿠폰을 사용하지 못해, 사용 가능한 쿠폰의 리스트는 2개이다.', () => {
      const testOrderList: Cart[] = [MOCK_ORDER_LIST[2]];
      const testTotalPrice = testOrderList.reduce((acc, cur) => {
        return acc + cur.quantity * cur.product.price;
      }, 0);

      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: testTotalPrice,
          orderList: testOrderList,
        }).applicableCoupons(),
      );

      expect(result.current.length).toBe(2);
    });

    it('주문한 상품 중 단 하나도 수량이 3개 이상이 없으므로, 2 + 1 쿠폰을 사용하지 못해, 사용 가능한 쿠폰의 리스트는 3개이다.', () => {
      const testOrderList: Cart[] = MOCK_ORDER_LIST.slice(0, 2);
      const testTotalPrice = testOrderList.reduce((acc, cur) => {
        return acc + cur.quantity * cur.product.price;
      }, 0);

      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: testTotalPrice,
          orderList: testOrderList,
        }).applicableCoupons(),
      );

      expect(result.current.length).toBe(3);
    });

    it('모든 쿠폰을 사용할 수 있어, 사용 가능한 쿠폰의 리스트는 4개이다.', () => {
      const { result } = renderHook(() =>
        findApplicableCoupons({
          validCouponList: MOCK_COUPON_LIST,
          totalOrderPrice: MOCK_ORDER_TOTAL_PRICE,
          orderList: MOCK_ORDER_LIST,
        }).applicableCoupons(),
      );

      expect(result.current.length).toBe(4);
    });
  });
});
