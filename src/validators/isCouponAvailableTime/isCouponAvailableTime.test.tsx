import { isCouponAvailableTime } from './isCouponAvailableTime';
import { mockCoupons } from '../../mocks/mockCouponData';

describe('isCouponAvailableTime', () => {
  it('사용 가능 시간 외에는 쿠폰을 적용할 수 없다', () => {
    const testTime = new Date('2023-05-01T08:00:00');
    expect(isCouponAvailableTime(mockCoupons[3], testTime)).toBe(false);
  });

  it('사용 가능 시간 내에는 쿠폰을 적용할 수 있다', () => {
    const testTime = new Date('2023-05-01T07:00:00');
    expect(isCouponAvailableTime(mockCoupons[3], testTime)).toBe(true);
  });
});
