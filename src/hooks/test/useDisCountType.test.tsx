import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import {
  buy1get1,
  couponPriority,
  fixed1000,
  percentageDiscount,
} from './coupons.testData';
import { cartItemQuantityState, cartItemsState } from '../../recoil/cartItems';
import mockCartItems from './mockCartItems.testData';
import { cartQuantityPass } from './cartQuantity.testData';
import useDiscountType from '../useDiscountType';

describe('useDiscountType', () => {
  describe('쿠폰 타입 할인 테스트 ', () => {
    it('discountType이 fixed이며 discount가 1000 일 경우 천원이 할인된다. ', async () => {
      const { result } = renderHook(() => useDiscountType(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);

              cartQuantityPass.forEach((isCartItemQuantity) =>
                set(
                  cartItemQuantityState(isCartItemQuantity.id),
                  isCartItemQuantity.quantity,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(async () => {
        result.current.applyCoupon(fixed1000);
        await expect(result.current.getDiscountAmount).toBe(1000);
      });
    });

    it('discountType이 buy1get1 일 경우 수량이 1인 제품 중 가장 비싼 제품 가격만큼 할인된다.  ', async () => {
      const { result } = renderHook(() => useDiscountType(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);

              cartQuantityPass.forEach((isCartItemQuantity) =>
                set(
                  cartItemQuantityState(isCartItemQuantity.id),
                  isCartItemQuantity.quantity,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(async () => {
        result.current.applyCoupon(buy1get1);
        await expect(result.current.getDiscountAmount).toBe(50000);
      });
    });

    it('discountType이 percentageDiscount이며 discount가 20일 경우 전체 가격(270000)의 20%가 할인된다.)', async () => {
      const { result } = renderHook(() => useDiscountType(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);

              cartQuantityPass.forEach((isCartItemQuantity) =>
                set(
                  cartItemQuantityState(isCartItemQuantity.id),
                  isCartItemQuantity.quantity,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(async () => {
        result.current.applyCoupon(percentageDiscount);
        await expect(result.current.getDiscountAmount).toBe(54000);
      });
    });
  });

  describe('쿠폰 타입 우선순위 테스트 ', () => {
    it('fixed1000과 percentage30 쿠폰이 적용 될 경우 percentage30 가 먼저 적용된 가격으로 할인된다.', async () => {
      const { result } = renderHook(() => useDiscountType(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);

              cartQuantityPass.forEach((isCartItemQuantity) =>
                set(
                  cartItemQuantityState(isCartItemQuantity.id),
                  isCartItemQuantity.quantity,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(async () => {
        result.current.applyCoupon(couponPriority);
        await expect(result.current.getDiscountAmount).toBe(55000);
      });
    });
  });
});
