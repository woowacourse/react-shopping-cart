import { isCouponValid } from './validations';

import { Coupon } from '@/types/coupon';

describe('couponValidator', () => {
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
      description: '만료된 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-21',
    };

    expect(isCouponValid(expiredCoupon)).toBeFalsy();
  });

  it.each([['2024-05-22'], ['2024-05-23']])(
    '만료기간이 유효한 쿠폰이라면, "true"를 반환합니다.',
    (date: string) => {
      const expiredCoupon: Coupon = {
        id: 1,
        code: 'FIXED5000',
        description: '만료된 쿠폰',
        discountType: 'fixed',
        expirationDate: date,
      };

      expect(isCouponValid(expiredCoupon)).toBeTruthy();
    },
  );
});
