import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { isCouponAvailable } from '../../src/utils/couponAvailability';
import { Coupon } from '../../src/types/coupon';

describe('isCouponAvailable', () => {
  const mockCoupon: Coupon = {
    id: 1,
    code: 'TEST',
    expirationDate: '2025-12-31',
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('만료일 검증', () => {
    it('만료되지 않은 쿠폰은 사용 가능하다', () => {
      vi.setSystemTime(new Date('2025-01-01'));

      expect(isCouponAvailable(mockCoupon)).toBe(true);
    });

    it('만료일이 오늘인 쿠폰은 사용 가능하다', () => {
      vi.setSystemTime(new Date('2025-12-31'));

      expect(isCouponAvailable(mockCoupon)).toBe(true);
    });

    it('만료된 쿠폰은 사용 불가능하다', () => {
      vi.setSystemTime(new Date('2026-01-01'));

      expect(isCouponAvailable(mockCoupon)).toBe(false);
    });
  });

  describe('시간 제한 쿠폰 검증', () => {
    const timeLimitedCoupon: Coupon = {
      ...mockCoupon,
      availableTime: {
        start: '04:00',
        end: '07:00',
      },
    };

    it('사용 가능 시작 시간에 쿠폰을 사용할 수 있다', () => {
      vi.setSystemTime(new Date('2025-01-01 04:00:00'));

      expect(isCouponAvailable(timeLimitedCoupon)).toBe(true);
    });

    it('사용 가능 종료 시간에 쿠폰을 사용할 수 있다', () => {
      vi.setSystemTime(new Date('2025-01-01 07:00:00'));

      expect(isCouponAvailable(timeLimitedCoupon)).toBe(true);
    });

    it('사용 가능 시간 이전에는 쿠폰을 사용할 수 없다', () => {
      vi.setSystemTime(new Date('2025-01-01 03:59:00'));

      expect(isCouponAvailable(timeLimitedCoupon)).toBe(false);
    });

    it('사용 가능 시간 이후에는 쿠폰을 사용할 수 없다', () => {
      vi.setSystemTime(new Date('2025-01-01 07:01:00'));

      expect(isCouponAvailable(timeLimitedCoupon)).toBe(false);
    });
  });

  describe('복합 조건 검증', () => {
    it('만료되지 않고 시간 조건도 충족하는 쿠폰은 사용 가능하다', () => {
      const complexCoupon: Coupon = {
        ...mockCoupon,
        expirationDate: '2025-12-31',
        availableTime: {
          start: '04:00',
          end: '07:00',
        },
      };

      vi.setSystemTime(new Date('2025-01-01 05:00:00'));

      expect(isCouponAvailable(complexCoupon)).toBe(true);
    });

    it('만료되지 않았지만 시간 조건을 충족하지 않는 쿠폰은 사용 불가능하다', () => {
      const complexCoupon: Coupon = {
        ...mockCoupon,
        expirationDate: '2025-12-31',
        availableTime: {
          start: '04:00',
          end: '07:00',
        },
      };

      vi.setSystemTime(new Date('2025-01-01 10:00:00'));

      expect(isCouponAvailable(complexCoupon)).toBe(false);
    });

    it('시간 조건은 충족하지만 만료된 쿠폰은 사용 불가능하다', () => {
      const complexCoupon: Coupon = {
        ...mockCoupon,
        expirationDate: '2025-01-01',
        availableTime: {
          start: '04:00',
          end: '07:00',
        },
      };

      vi.setSystemTime(new Date('2025-01-02 05:00:00'));

      expect(isCouponAvailable(complexCoupon)).toBe(false);
    });
  });

  describe('미라클 모닝 쿠폰', () => {
    const miracleCoupon: Coupon = {
      id: 4,
      code: 'MIRACLESALE',
      expirationDate: '2025-07-31',
      discountType: 'percentage',
      discount: 30,
      availableTime: {
        start: '04:00',
        end: '07:00',
      },
    };

    it('오전 4시부터 7시 사이에만 사용 가능하다', () => {
      vi.setSystemTime(new Date('2025-03-15 04:00:00'));
      expect(isCouponAvailable(miracleCoupon)).toBe(true);

      vi.setSystemTime(new Date('2025-03-15 07:00:00'));
      expect(isCouponAvailable(miracleCoupon)).toBe(true);

      vi.setSystemTime(new Date('2025-03-15 03:59:00'));
      expect(isCouponAvailable(miracleCoupon)).toBe(false);

      vi.setSystemTime(new Date('2025-03-15 07:01:00'));
      expect(isCouponAvailable(miracleCoupon)).toBe(false);

      vi.setSystemTime(new Date('2025-03-15 16:00:00'));
      expect(isCouponAvailable(miracleCoupon)).toBe(false);
    });
  });
});
