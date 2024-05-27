import { isCouponUsableTime, isCouponActive, isOverMinimumOrderAmount } from './validations';

import { Coupon } from '@/types/coupon';

describe('validations', () => {
  describe('isCouponActive', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-05-22'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('만료기간이 지난 쿠폰이라면, "false"를 반환합니다.', () => {
      const expiredCoupon: Coupon = {
        id: 1,
        code: 'FIXED5000',
        discount: 5000,
        description: '만료된 쿠폰',
        discountType: 'fixed',
        expirationDate: '2024-05-21',
      };

      expect(isCouponActive(expiredCoupon)).toBeFalsy();
    });

    it.each([['2024-05-22'], ['2024-05-23']])(
      '만료기간이 유효한 쿠폰이라면, "true"를 반환합니다.',
      (date: string) => {
        const validCoupon: Coupon = {
          id: 1,
          code: 'FIXED5000',
          discount: 5000,
          description: '유효한 쿠폰',
          discountType: 'fixed',
          expirationDate: date,
        };

        expect(isCouponActive(validCoupon)).toBeTruthy();
      },
    );
  });

  describe('isOverMinimumOrderAmount', () => {
    const coupon: Coupon = {
      id: 1,
      code: 'FIXED5000',
      discount: 5000,
      description: '5000원 할인 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-22',
      minimumAmount: 50000,
    };
    it.each([[50000], [51000]])(
      '쿠폰의 최소 주문 금액을 만족한다면, "true"를 반환합니다.',
      (orderTotal: number) => {
        expect(isOverMinimumOrderAmount(coupon, orderTotal)).toBeTruthy();
      },
    );

    it('쿠폰의 최소 주문 금액을 만족하지 못한다면, "false"를 반환합니다.', () => {
      const orderTotal = 49000;

      expect(isOverMinimumOrderAmount(coupon, orderTotal)).toBeFalsy();
    });
  });

  describe('isCouponUsableTime', () => {
    const coupon: Coupon = {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: '2024-07-31',
      discount: 30,
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      discountType: 'percentage',
    };
    it.each([['2024-05-22T07:00:01'], ['2024-05-22T03:59:59']])(
      '쿠폰 적용 가능 시간이 아니라면, "false"를 반환합니다.',
      (date: string) => {
        const testTime = new Date(date);

        expect(isCouponUsableTime(coupon, testTime)).toBeFalsy();
      },
    );

    it.each([['2024-05-22T04:00:00'], ['2024-05-22T07:00:00']])(
      '쿠폰 적용 가능 시간이라면, "true"를 반환합니다.',
      (date: string) => {
        const testTime = new Date(date);

        expect(isCouponUsableTime(coupon, testTime)).toBeTruthy();
      },
    );
  });
});
