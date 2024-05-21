import { Coupon } from '../../types/coupon.type';
import { isValidCoupon } from './isValidCoupon';

/**
 * 날짜 모킹
 * 모킹된 날짜와 쿠폰을 훅의 validate에 넣는다.
 */
describe('isValidCoupon 함수 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-22'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('기간이 지난 쿠폰은 유효하지 않은 쿠폰이다.', () => {
    const expiredCoupon: Coupon = {
      id: 1,
      code: 'EXPIRED_MOCK_COUPON',
      description: '만료된 쿠폰',
      discountType: 'buyXgetY',
      expirationDate: '2001-03-24',
    };

    expect(isValidCoupon(expiredCoupon)).toBeFalsy();
  });
  it('기간이 아직 지나지 않은 쿠폰은 유효한 쿠폰이다.', () => {
    const validCoupon: Coupon = {
      id: 1,
      code: 'VALID_MOCK_COUPON',
      description: '아직 사용가능한 쿠폰',
      discountType: 'buyXgetY',
      expirationDate: '2026-03-24',
    };

    expect(isValidCoupon(validCoupon)).toBeTruthy();
  });
});
