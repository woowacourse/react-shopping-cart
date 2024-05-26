import { vi } from 'vitest';
import findCouponValidator from '../domain/findCouponValidator';
import { MOCK_COUPON_LIST } from '../constants/mock';

describe('findCouponValidator', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-05-20'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('쿠폰의 만료일을 확인한다.', () => {
    it('만료일이 지난 쿠폰은 유효하지 않다.', () => {
      const { isCouponValid } = findCouponValidator(MOCK_COUPON_LIST);

      expect(isCouponValid(MOCK_COUPON_LIST[1])).toBe(false);
    });

    it('만료일이 지나지 않은 쿠폰은 유효하다.', () => {
      const { isCouponValid } = findCouponValidator(MOCK_COUPON_LIST);

      expect(isCouponValid(MOCK_COUPON_LIST[0])).toBe(true);
    });
  });

  describe('쿠폰 목록에서 만료일이 지나지 않은 쿠폰을 찾는다.', () => {
    it('만료일이 지나지 않은 사용 가능의 쿠폰의 갯수는 3개이다.', () => {
      const { validCoupon } = findCouponValidator(MOCK_COUPON_LIST);

      expect(validCoupon().length).toBe(3);
    });
  });
});
