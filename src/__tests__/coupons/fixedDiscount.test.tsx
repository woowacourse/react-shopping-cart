import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { couponApplicabilityChecker } from '@/components/Coupon/utils/couponApplicabilityChecker';
import couponDiscountCalculator from '@/components/Coupon/utils/couponDiscountCalculator';
import { couponValidator } from '@/components/Coupon/utils/couponValidator';
import { CONFIG } from '@/constants/config';
import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@/mocks/cart';
import { MOCK_COUPON_CHECK_LIST } from '@/mocks/coupon';
import { cartItemsState } from '@/recoil/cartItems/atoms';
import { couponSavedCheckListState } from '@/recoil/coupons/atoms';
import { Coupon } from '@/types/coupon';

const EXPIRED_COUPON: Coupon = {
  id: 1,
  code: 'FIXED5000',
  description: '만료된 쿠폰',
  discountType: 'fixed',
  expirationDate: '2024-11-30',
};

const APPLICABLE_COUPON: Coupon = {
  id: 1,
  code: 'FIXED5000',
  description: '만료된 쿠폰',
  discountType: 'fixed',
  expirationDate: '2024-12-01',
};

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

jest.mock('@apis/coupon', () => ({
  fetchCouponList: jest.fn(),
}));

describe('5000원 할인 쿠폰', () => {
  describe('주문 금액에 따라 쿠폰 적용 테스트', () => {
    it.each`
      data                             | TOTAL_PRICE | RESULT
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${24000}    | ${false}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${100000}   | ${true}
    `(
      `주문 금액이 ${CONFIG.FREE_SHIPPING_CONDITION}원 이상일 때만 5000원 할인 쿠폰을 사용할 수 있다. ($RESULT)`,
      async ({ data, TOTAL_PRICE, RESULT }) => {
        const { result } = renderHook(
          () => {
            const { isCouponApplicable } = couponApplicabilityChecker(MOCK_COUPON_CHECK_LIST);

            return isCouponApplicable({
              coupon: MOCK_COUPON_CHECK_LIST[0],
              totalOrderPrice: TOTAL_PRICE,
            });
          },
          {
            wrapper: ({ children }) => (
              <RecoilRoot
                initializeState={({ set }) => {
                  set(cartItemsState, data);
                  set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
                }}
              >
                {children}
              </RecoilRoot>
            ),
          },
        );

        await waitFor(() => {
          expect(result.current).toBe(RESULT);
        });
      },
    );
  });

  describe('쿠폰 만료일 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-11-31'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });
    it.each`
      data                 | CURRENT_DATE    | EXPIRATION_DATE | RESULT
      ${EXPIRED_COUPON}    | ${'2024-11-31'} | ${'2024-11-30'} | ${false}
      ${APPLICABLE_COUPON} | ${'2024-11-31'} | ${'2024-12-01'} | ${true}
    `(
      `현재 시간($CURRENT_DATE)이 만료일($EXPIRATION_DATE)이 지난 경우 쿠폰을 사용할 수 없다. ($RESULT)`,
      async ({ data, RESULT }) => {
        const { result } = renderHook(
          () => {
            const { isCouponValid } = couponValidator();
            return isCouponValid(data);
          },
          {
            wrapper: RecoilRoot,
          },
        );

        await waitFor(() => {
          expect(result.current).toBe(RESULT);
        });
      },
    );
  });

  describe('주문 금액에 따라 쿠폰 할인값 테스트', () => {
    it.each`
      data                             | TOTAL_PRICE | RESULT
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${24000}    | ${0}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${100000}   | ${5000}
    `(
      `100000원 이상 구매 시 쿠폰 적용할 경우 5000원의 할인 금액을 반환한다.`,
      async ({ data, TOTAL_PRICE, RESULT }) => {
        const { result } = renderHook(
          () => {
            const { calculateDiscountAmount } = couponDiscountCalculator(MOCK_COUPON_CHECK_LIST);
            return calculateDiscountAmount(MOCK_COUPON_CHECK_LIST[0], TOTAL_PRICE);
          },
          {
            wrapper: ({ children }) => (
              <RecoilRoot
                initializeState={({ set }) => {
                  set(cartItemsState, data);
                  set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
                }}
              >
                {children}
              </RecoilRoot>
            ),
          },
        );

        await waitFor(() => {
          expect(result.current).toBe(RESULT);
        });
      },
    );
  });
});
