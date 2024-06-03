import { renderHook } from '@testing-library/react';

import { RecoilRoot } from 'recoil';
import {
  cartItemsState,
  couponsState,
  isCartItemSelectedState,
  isCouponSelectedState,
} from '../recoil/atoms';

import useCouponApplicability from '../hooks/useCouponApplicability';

import { mockCoupons } from '../mocks/coupons';
import mockCartItems from '../mocks/cartItems';
import mockIsCartItemSelecteds from '../mocks/isCartItemSelecteds';
import mockIsCouponSelecteds from '../mocks/isCouponSelecteds';
import couponValidator from '../validators/couponValidator';

describe('useCouponApplicability', () => {
  describe('BOGO', () => {
    it('수량이 3개 이상인 제품이 없는 경우 쿠폰 사용이 불가하다.', () => {
      const TEST_COUPON = mockCoupons[1];
      const INAPPLICABLE_CART_ITEMS = mockCartItems.slice(0, 2);

      const { result } = renderHook(() => useCouponApplicability(TEST_COUPON), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, INAPPLICABLE_CART_ITEMS);
              set(couponsState, mockCoupons);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.isCouponApplicable).toBe(false);
    });

    it('수량이 3개 이상인 제품이 있는 경우 쿠폰 사용이 가능하다.', () => {
      const TEST_COUPON = mockCoupons[1];

      const { result } = renderHook(() => useCouponApplicability(TEST_COUPON), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              set(couponsState, mockCoupons);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.isCouponApplicable).toBe(true);
    });
  });

  describe('이미 쿠폰을 2개 선택한 경우', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-05-01T06:00:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('선택할 수 있음에도 선택되지 않은 쿠폰의 경우 사용이 불가하다.', () => {
      const TEST_COUPON = mockCoupons[3];

      const { validateCoupon } = couponValidator();

      const { result } = renderHook(() => useCouponApplicability(TEST_COUPON), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              mockIsCartItemSelecteds.forEach((isCartItemSelected) =>
                set(
                  isCartItemSelectedState(isCartItemSelected.id),
                  isCartItemSelected.boolean,
                ),
              );
              set(couponsState, mockCoupons);
              mockIsCouponSelecteds.forEach((mockIsCouponSelected) =>
                set(
                  isCouponSelectedState(mockIsCouponSelected.id),
                  mockIsCouponSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(validateCoupon(TEST_COUPON)).toBe(true);
      expect(result.current.isCouponApplicable).toBe(false);
    });
  });
});
