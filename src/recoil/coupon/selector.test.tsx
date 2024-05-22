import { renderHook } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { couponsState } from './atom';
import {
  applicableCouponSelector,
  calculateDiscountAmountSelector,
  couponSelector,
} from './selector';
import { cartItemsState } from '../cartItems/atoms';
import {
  checkedItemsSelector,
  deliveryPriceState,
  orderTotalPriceState,
} from '../cartItems/selectors';

import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@/mocks/cartItems';
import {
  INVALID_BOGO_COUPON,
  VALID_FIXED_COUPON,
  VALID_FREE_SHIPPING_COUPON,
  VALID_PERCENTAGE_COUPON,
  VALID_BuyXgetY_COUPON,
  coupons,
} from '@/mocks/coupons';

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
      const INVALID_BOGO_COUPON_CODE = 'INVALID_BOGO_COUPON';
      const { result } = renderHook(
        () => useRecoilValue(couponSelector(INVALID_BOGO_COUPON_CODE)),
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current).toBeUndefined();
    });
  });

  describe('applicableCouponSelector', () => {
    it('쿠폰이 유효하지 않다면, "false"를 반환한다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(applicableCouponSelector(INVALID_BOGO_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [INVALID_BOGO_COUPON])
              )}
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
        () => useRecoilValue(applicableCouponSelector(VALID_FIXED_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [VALID_FIXED_COUPON])
              )}
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
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-05-22T05:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('유효한 "fixed"타입의 쿠폰을 적용하면 해당 금액만큼 할인된다.', () => {
      const { result } = renderHook(
        () => useRecoilValue(calculateDiscountAmountSelector(VALID_FIXED_COUPON.code)),
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [VALID_FIXED_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBe(VALID_FIXED_COUPON.discount);
    });

    it('유효한 "percentage"타입의 쿠폰을 적용하면 해당 금액만큼 할인된다.', () => {
      const { result } = renderHook(
        () => {
          const discountAmount = useRecoilValue(
            calculateDiscountAmountSelector(VALID_PERCENTAGE_COUPON.code),
          );
          const orderTotalAmount = useRecoilValue(orderTotalPriceState);

          return { discountAmount, orderTotalAmount };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA),
                set(couponsState, [VALID_PERCENTAGE_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      const discountedFromTotalAmount = Math.floor(
        (result.current.orderTotalAmount * VALID_PERCENTAGE_COUPON.discount!) / 100,
      );

      expect(result.current.discountAmount).toBe(discountedFromTotalAmount);
    });

    it('유효한 "freeShipping"타입의 쿠폰을 적용하면 배송비만큼 할인된다.', () => {
      const { result } = renderHook(
        () => {
          const discountAmount = useRecoilValue(
            calculateDiscountAmountSelector(VALID_FREE_SHIPPING_COUPON.code),
          );
          const deliveryPrice = useRecoilValue(deliveryPriceState);

          return { discountAmount, deliveryPrice };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => (
                set(cartItemsState, TOTAL_PRICE_UNDER_100000_DATA),
                set(couponsState, [VALID_FREE_SHIPPING_COUPON])
              )}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current.discountAmount).toBe(result.current.deliveryPrice);
    });
  });
});
