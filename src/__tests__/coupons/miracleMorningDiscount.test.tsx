import { renderHook, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { fetchCouponList } from '@/apis/coupon';
import { couponApplicabilityChecker } from '@/components/Coupon/utils/couponApplicabilityChecker';
import { TOTAL_PRICE_OVER_100000_DATA } from '@/mocks/cart';
import { CHECKED_MIRACLE_MORNING_COUPON, MOCK_COUPON_CHECK_LIST } from '@/mocks/coupon';
import { cartItemsState } from '@/recoil/cartItems/atoms';
import { totalPurchasePriceState } from '@/recoil/cartItems/selectors';
import { couponSavedCheckListState } from '@/recoil/coupons/atoms';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

jest.mock('@apis/coupon', () => ({
  fetchCouponList: jest.fn(),
}));

describe('미라클 모닝 30% 할인 쿠폰', () => {
  describe('쿠폰 적용 시간대 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    it('오전 4시 전에는 미라클모닝 30% 쿠폰을 적용할 수 없다.', async () => {
      jest.setSystemTime(new Date('2000-09-01T03:59:59'));

      const { result } = renderHook(
        () => {
          const { isCouponApplicable } = couponApplicabilityChecker(MOCK_COUPON_CHECK_LIST);

          return isCouponApplicable(MOCK_COUPON_CHECK_LIST[3], 100000);
        },
        {
          wrapper: RecoilRoot,
        },
      );

      await waitFor(() => expect(result.current).toBe(false));
    });

    it('오전 4시부터 미라클모닝 30% 쿠폰을 적용할 수 있다.', async () => {
      jest.setSystemTime(new Date('2000-09-01T04:00:00'));
      const { result } = renderHook(
        () => {
          const { isCouponApplicable } = couponApplicabilityChecker(MOCK_COUPON_CHECK_LIST);

          return isCouponApplicable(MOCK_COUPON_CHECK_LIST[3], 100000);
        },
        {
          wrapper: RecoilRoot,
        },
      );

      await waitFor(() => expect(result.current).toBe(true));
    });

    it('오전 7시 이후에는 미라클모닝 30% 쿠폰을 적용할 수 없다.', async () => {
      jest.setSystemTime(new Date('2000-09-01T07:00:01'));
      const { result } = renderHook(
        () => {
          const { isCouponApplicable } = couponApplicabilityChecker(MOCK_COUPON_CHECK_LIST);

          return isCouponApplicable(MOCK_COUPON_CHECK_LIST[3], 100000);
        },
        {
          wrapper: RecoilRoot,
        },
      );

      await waitFor(() => expect(result.current).toBe(false));
    });
  });

  describe('만료일 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-08-01T04:00:00'));
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    it('적용 가능한 시간대에도 현재 시간(2024-08-01)이 만료일(2024-07-31)을 지나는 경우 쿠폰을 적용할 수 없다.', async () => {
      const { result } = renderHook(
        () => {
          const { isCouponApplicable } = couponApplicabilityChecker(MOCK_COUPON_CHECK_LIST);

          return isCouponApplicable(MOCK_COUPON_CHECK_LIST[3], 100000);
        },
        {
          wrapper: RecoilRoot,
        },
      );

      await waitFor(() => expect(result.current).toBe(false));
    });
  });

  describe('할인 금액 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-07-01T04:00:00'));
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    it('쿠폰 적용 시 주문 금액(100000)의 30% 할인된 가격으로 최종 결제 금액(70000)을 계산한다.', async () => {
      (fetchCouponList as jest.Mock).mockResolvedValue(MOCK_COUPON_CHECK_LIST);

      const { result } = renderHook(
        () => {
          const totalPurchasePrice = useRecoilValue(totalPurchasePriceState);

          return { totalPurchasePrice };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA);
                set(couponSavedCheckListState, CHECKED_MIRACLE_MORNING_COUPON);
              }}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => expect(result.current.totalPurchasePrice).toBe(70000));
    });
  });
});
