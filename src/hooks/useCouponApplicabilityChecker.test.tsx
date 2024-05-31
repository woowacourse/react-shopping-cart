import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useCouponApplicabilityChecker } from './useCouponApplicabilityChecker';
import { couponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';
import { DELIVERY } from '../constants/Delivery';

describe('useCouponApplicabilityChecker', () => {
  const createMockCoupon = (expirationDate: string) => ({
    ...mockCoupons[0],
    expirationDate,
  });

  it('쿠폰이 만료되지 않았으면 적용 가능하다.', () => {
    const availableCoupon = createMockCoupon(
      new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    );

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, [availableCoupon])}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(
      result.current.isCouponApplicable(
        availableCoupon,
        DELIVERY.noDeliveryFeeStandard,
      ),
    ).toBe(true);
  });

  it('쿠폰이 만료되었으면 적용 불가능하다.', () => {
    const expiredCoupon = createMockCoupon(
      new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    );

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, [expiredCoupon])}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(
      result.current.isCouponApplicable(
        expiredCoupon,
        DELIVERY.noDeliveryFeeStandard,
      ),
    ).toBe(false);
  });

  it('사용 가능 시간 내에만 쿠폰 적용 가능하다.', () => {
    const withinAvailableTimeCoupon = {
      ...mockCoupons[0],
      availableTime: {
        start: '10:00:00',
        end: '22:00:00',
      },
    };

    const testTimeWithin = new Date();
    testTimeWithin.setHours(15);

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(couponsState, [withinAvailableTimeCoupon])
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(
      result.current.isCouponApplicable(
        withinAvailableTimeCoupon,
        DELIVERY.noDeliveryFeeStandard,
        testTimeWithin,
      ),
    ).toBe(true);
  });

  it('사용 가능 시간 외에는 쿠폰 적용 불가능하다.', () => {
    const outsideAvailableTimeCoupon = {
      ...mockCoupons[0],
      availableTime: {
        start: '10:00:00',
        end: '22:00:00',
      },
    };

    const testTimeOutside = new Date();
    testTimeOutside.setHours(9);

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(couponsState, [outsideAvailableTimeCoupon])
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(
      result.current.isCouponApplicable(
        outsideAvailableTimeCoupon,
        DELIVERY.noDeliveryFeeStandard,
        testTimeOutside,
      ),
    ).toBe(false);
  });

  it('주문 금액이 최소 주문 금액 미만이면 쿠폰 적용이 불가능하다.', () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const totalAmount = mockCoupons[2].minimumAmount
      ? mockCoupons[2].minimumAmount - 1
      : 0;

    expect(result.current.isCouponApplicable(mockCoupons[2], totalAmount)).toBe(
      false,
    );
  });

  it('주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능하다.', () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const totalAmount = mockCoupons[2].minimumAmount
      ? mockCoupons[2].minimumAmount
      : 0;

    expect(result.current.isCouponApplicable(mockCoupons[2], totalAmount)).toBe(
      true,
    );
  });
});
