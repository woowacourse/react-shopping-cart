import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import couponDiscountCalculator from '@/components/Coupon/utils/couponDiscountCalculator';
import { couponValidator } from '@/components/Coupon/utils/couponValidator';
import { OVER_THREE_COUNT_DATA } from '@/mocks/cart';
import { CHECKED_BOGO_COUPON, MOCK_COUPON_CHECK_LIST } from '@/mocks/coupon';
import { cartItemsState } from '@/recoil/cartItems/atoms';
import { couponChecklistState } from '@/recoil/coupons/atoms';
import { Coupon } from '@/types/coupon';

const EXPIRED_COUPON: Coupon = {
  id: 1,
  code: 'BOGO',
  description: '만료된 쿠폰',
  discountType: 'fixed',
  expirationDate: '2024-05-30',
};

const APPLICABLE_COUPON: Coupon = {
  id: 1,
  code: 'BOGO',
  description: '만료된 쿠폰',
  discountType: 'fixed',
  expirationDate: '2024-06-01',
};

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

jest.mock('@apis/coupon', () => ({
  fetchCouponList: jest.fn(),
}));

describe('2개 구매 시 1개 무료 쿠폰', () => {
  describe('쿠폰 만료일 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-05-31'));
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    it.each`
      data                 | CURRENT_DATE    | EXPIRATION_DATE | RESULT
      ${EXPIRED_COUPON}    | ${'2024-05-31'} | ${'2024-05-30'} | ${false}
      ${APPLICABLE_COUPON} | ${'2024-05-31'} | ${'2024-06-01'} | ${true}
    `(
      `현재 시간($CURRENT_DATE)이 만료일($EXPIRATION_DATE)을 지나지 않은 경우 쿠폰을 사용할 수 있다. ($RESULT)`,
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

  describe('할인 금액 테스트', () => {
    it(`3개를 담으면 1개 가격만큼 할인한 금액을 반환한다.`, async () => {
      const { result } = renderHook(
        () => {
          const { calculateDiscountAmount } = couponDiscountCalculator(MOCK_COUPON_CHECK_LIST);

          return calculateDiscountAmount(MOCK_COUPON_CHECK_LIST[1], 100000, [
            OVER_THREE_COUNT_DATA[0],
          ]);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, OVER_THREE_COUNT_DATA);
                set(couponChecklistState, CHECKED_BOGO_COUPON);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      await waitFor(() => {
        expect(result.current).toBe(10000);
      });
    });

    it(`3개 이상 담은 제품이 여러개라면 1개 가격이 가장 비싼 제품으로 할인이 적용된다.`, async () => {
      const { result } = renderHook(
        () => {
          const { calculateDiscountAmount } = couponDiscountCalculator(MOCK_COUPON_CHECK_LIST);

          return calculateDiscountAmount(MOCK_COUPON_CHECK_LIST[1], 100000, OVER_THREE_COUNT_DATA);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, OVER_THREE_COUNT_DATA);
                set(couponChecklistState, CHECKED_BOGO_COUPON);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      await waitFor(() => {
        expect(result.current).toBe(15000);
      });
    });
  });
});
