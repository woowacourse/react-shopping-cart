import { renderHook } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import {
  applicableCouponSelector,
  calculateDiscountAmountSelector,
  couponSelector,
} from './selector';
import { cartItemsState } from '../cartItems/atoms';

import { TOTAL_PRICE_OVER_100000_DATA } from '@/mocks/cartItems';
import { INVALID_COUPON, VALID_COUPON, coupons } from '@/mocks/coupons';

describe('coupon selector', () => {
  describe('couponSelector', () => {
    const couponCodes = coupons.map(({ code }) => code);
    it.each([...couponCodes])(
      '존재하는 쿠폰(%s)을 찾으면 해당 쿠폰을 반환한다.',
      (couponCode: string) => {
        const { result } = renderHook(() => useRecoilValue(couponSelector(couponCode)), {
          wrapper: RecoilRoot,
        });

        expect(result.current).toBeDefined();
      },
    );

    it('쿠폰이 존재하지 않으면 undefined를 반환한다.', () => {
      const INVALID_COUPON_CODE = 'INVALID_COUPON';
      const { result } = renderHook(() => useRecoilValue(couponSelector(INVALID_COUPON_CODE)), {
        wrapper: RecoilRoot,
      });

      expect(result.current).toBeUndefined();
    });
  });

  describe('applicableCouponSelector', () => {
    it('쿠폰이 유효하지 않다면, "false"를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableCouponSelector(INVALID_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA)}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeFalsy();
    });

    it('쿠폰이 유효하다면, "true"를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableCouponSelector(VALID_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA)}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeTruthy();
    });
  });

  describe('calculateDiscountAmountSelector', () => {
    it('유효한 "fixed"타입의 쿠폰을 적용하면 해당 금액만큼 할인된다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(calculateDiscountAmountSelector(VALID_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA)}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBe(5000);
    });
  });
});
