import { CouponProps } from '../../types';
import { CouponValidator } from './CouponValidator';

describe('CouponValidator', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-31'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('만료일이 지난 쿠폰은 유효하지 않은 쿠폰이다', () => {
    const expiredCoupon: CouponProps = {
      id: 1,
      code: 'INVALID_COUPON',
      description: '유효하지 않은 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-30',
    };
    const { isCouponValid } = CouponValidator();
    expect(isCouponValid(expiredCoupon)).toBe(false);
  });

  it('만료일이 지나지 않은 쿠폰은 유효한 쿠폰이다', () => {
    const validCoupon: CouponProps = {
      id: 2,
      code: 'VALID_COUPON',
      description: '유효한 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-06-01',
    };
    const { isCouponValid } = CouponValidator();
    expect(isCouponValid(validCoupon)).toBe(true);
  });
});
