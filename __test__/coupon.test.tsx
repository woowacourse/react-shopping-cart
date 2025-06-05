import { describe, it } from 'vitest';
import { validateExpirationDate } from '../src/features/coupon/utils/validateExpirationDate';

describe('쿠폰이 유효한지 테스트', () => {
  it('validateExpirationDate 함수를 사용해서 현재 날짜보다 이후면 true를 반환한다.', () => {
    const couponExpirationDate = '2028-12-31';
    const isCouponExpirationDateValid = validateExpirationDate(couponExpirationDate);
    expect(isCouponExpirationDateValid).toBe(true);
  });

  it('validateExpirationDate 함수를 사용해서 현재 날짜보다 이전이면 false를 반환한다.', () => {
    const couponExpirationDate = '2025-06-05';
    const isCouponExpirationDateValid = validateExpirationDate(couponExpirationDate);
    expect(isCouponExpirationDateValid).toBe(false);
  });
});
