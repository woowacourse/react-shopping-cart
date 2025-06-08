import { describe, it } from 'vitest';
import { validateExpirationDate } from '../src/features/coupon/utils/validateExpirationDate';
import { validateAvailableTime } from '../src/features/coupon/utils/validateAvailableTime';

describe('쿠폰이 유효한지 테스트', () => {
  it('validateExpirationDate 함수를 사용해서 현재 날짜보다 이후면 true를 반환한다.', () => {
    const currentDate = new Date();
    const couponExpirationDate = '2028-12-31';
    const isCouponExpirationDateValid = validateExpirationDate(currentDate, couponExpirationDate);
    expect(isCouponExpirationDateValid).toBe(true);
  });

  it('validateExpirationDate 함수를 사용해서 현재 날짜보다 이전이면 false를 반환한다.', () => {
    const currentDate = new Date();
    const couponExpirationDate = '2025-06-05';
    const isCouponExpirationDateValid = validateExpirationDate(currentDate, couponExpirationDate);
    expect(isCouponExpirationDateValid).toBe(false);
  });

  it('validateAvailableTime 함수를 사용해서 현재 시간이 쿠폰 적용 시간이면 true를 반환한다.', () => {
    const couponAvailableTime = {
      start: '04:00:00',
      end: '07:00:00',
    };

    const currentDate = new Date('2025-06-06T05:00:00'); // 현재 시간을 5시로 설정

    const isCouponAvailableTimeValid = validateAvailableTime(currentDate, couponAvailableTime);
    expect(isCouponAvailableTimeValid).toBe(true);
  });
  it('validateAvailableTime 함수를 사용해서 현재 시간이 쿠폰 적용 시간이 아니면 false를 반환한다.', () => {
    const couponAvailableTime = {
      start: '04:00:00',
      end: '07:00:00',
    };

    const currentDate = new Date('2025-06-06T08:00:00'); // 현재 시간을 8시로 설정

    const isCouponAvailableTimeValid = validateAvailableTime(currentDate, couponAvailableTime);
    expect(isCouponAvailableTimeValid).toBe(false);
  });
});
