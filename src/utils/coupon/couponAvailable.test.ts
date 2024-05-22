import { Coupon } from '@/types/coupon.type';
import { RecoilRoot } from 'recoil';
import couponAvailable from './useCouponAvailable';
import { renderHook } from '@testing-library/react';

jest.mock('../api/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
  },
}));

describe('useCouponAvailable test', () => {
  it('[최소 주문 금액 이상] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 금액, 사용 가능 시간)', () => {
    const { result } = renderHook(
      () => {
        const minimumAmountCoupon: Coupon = {
          id: 2,
          code: 'MINIMUM_AMOUNT_COUPON',
          description: '최소 금액(만원) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          minimumAmount: 10000,
        };

        const today = new Date();

        const availableCouponList = couponAvailable({
          coupon: minimumAmountCoupon,
          orderPrice: 10000,
          date: today,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(true);
  });

  it('[최소 주문 금액 미만] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 금액, 사용 가능 시간)', () => {
    const { result } = renderHook(
      () => {
        const minimumAmountCoupon: Coupon = {
          id: 2,
          code: 'MINIMUM_AMOUNT_COUPON',
          description: '최소 금액(만원) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          minimumAmount: 10000,
        };

        const today = new Date();

        const availableCouponList = couponAvailable({
          coupon: minimumAmountCoupon,
          orderPrice: 9000,
          date: today,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(false);
  });

  it('[사용 가능 시간] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 금액, 사용 가능 시간)', () => {
    const { result } = renderHook(
      () => {
        const availableTimeCoupon: Coupon = {
          id: 2,
          code: 'AVAILABLE_TIME_COUPON',
          description: '얼리버드(AM 4:00 - 7:00) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          availableTime: {
            start: '04:00:00',
            end: '07:00:00',
          },
        };

        const AM4 = new Date(2024, 4, 22, 4, 0, 0, 0);

        const availableCouponList = couponAvailable({
          coupon: availableTimeCoupon,
          orderPrice: 10000,
          date: AM4,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(true);
  });

  it('[사용 불가능 시간] 쿠폰 적용 가능 조건을 확인한 후 사용 가능 여부를 알려준다. (최소 주문 금액, 사용 가능 시간)', () => {
    const { result } = renderHook(
      () => {
        const availableTimeCoupon: Coupon = {
          id: 2,
          code: 'AVAILABLE_TIME_COUPON',
          description: '얼리버드(AM 4:00 - 7:00) 쿠폰',
          expirationDate: '2024-08-31',
          discountType: 'fixed',
          availableTime: {
            start: '04:00:00',
            end: '07:00:00',
          },
        };

        const AM7_MIN10 = new Date(2024, 4, 22, 7, 10, 0, 0);

        const availableCouponList = couponAvailable({
          coupon: availableTimeCoupon,
          orderPrice: 10000,
          date: AM7_MIN10,
        });

        return availableCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current).toBe(false);
  });
});
