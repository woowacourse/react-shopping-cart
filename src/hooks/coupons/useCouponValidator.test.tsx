import useCouponValidator from './useCouponValidator';

describe('useCouponValidator 훅', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-23'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  it('만료일이 지난 쿠폰은 false를 리턴한다.', () => {
    const expiredCoupon = {
      id: 1,
      code: 'EXPIRED_COUPON',
      description: '만료된 쿠폰 테스트',
      discountType: 'none',
      expirationDate: '2024-01-01',
    };
    const { isValidCoupon } = useCouponValidator();
    expect(isValidCoupon(expiredCoupon)).toBe(false);
  });

  it('만료일이 지나지 않은 쿠폰은 true를 리턴한다.', () => {
    const effectiveDateCoupon = {
      id: 2,
      code: 'EFFECTIVE_COUPON',
      description: '기간이 남은 쿠폰 테스트',
      discountType: 'none',
      expirationDate: '2024-06-20',
    };
    const { isValidCoupon } = useCouponValidator();
    expect(isValidCoupon(effectiveDateCoupon)).toBe(true);
  });
});
