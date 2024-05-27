import { renderHook, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { fetchCouponList } from '@/apis/coupon';
import { couponApplicabilityChecker } from '@/components/Coupon/utils/couponApplicabilityChecker';
import { couponValidator } from '@/components/Coupon/utils/couponValidator';
import { TOTAL_PRICE_OVER_50000_DATA } from '@/mocks/cart';
import { CHECKED_FREE_SHIPPING_COUPON, MOCK_COUPON_CHECK_LIST } from '@/mocks/coupon';
import { cartItemsState } from '@/recoil/cartItems/atoms';
import { totalPurchasePriceState } from '@/recoil/cartItems/selectors';
import { couponSavedCheckListState } from '@/recoil/coupons/atoms';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

jest.mock('@apis/coupon', () => ({
  fetchCouponList: jest.fn(),
}));

describe('2개 구매 시 1개 무료 쿠폰', () => {
  it('주문 금액이 50000원 이상일 때 사용할 수 있다.', async () => {
    const { result } = renderHook(
      () => {
        const { isCouponApplicable } = couponApplicabilityChecker(MOCK_COUPON_CHECK_LIST);

        return isCouponApplicable({ coupon: MOCK_COUPON_CHECK_LIST[2], totalOrderPrice: 50000 });
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, TOTAL_PRICE_OVER_50000_DATA);
              set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  describe('쿠폰 만료일 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-09-01'));
    });
    afterAll(() => {
      jest.useRealTimers();
    });

    it('현재 시간이 만료일이 지난 경우 쿠폰을 사용할 수 없다.', async () => {
      const { result } = renderHook(
        () => {
          const { isCouponValid } = couponValidator();

          return isCouponValid(MOCK_COUPON_CHECK_LIST[2]);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, TOTAL_PRICE_OVER_50000_DATA);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });
  });

  describe('할인 금액 테스트', () => {
    it(`쿠폰 적용 시 결제 금액에서 배송비를 무료로 계산하여 최종 결제 금액을 계산한다.`, async () => {
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
                set(cartItemsState, TOTAL_PRICE_OVER_50000_DATA);
                set(couponSavedCheckListState, CHECKED_FREE_SHIPPING_COUPON);
              }}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => {
        expect(result.current.totalPurchasePrice).toBe(51000);
      });
    });
  });
});
