import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useCouponAvailable from '../useCouponAvailable';
import { mockCoupons } from './coupons.testData';
import { cartItemQuantityState, cartItemsState } from '../../recoil/cartItems';
import mockCartItems from './mockCartItems.testData';
import { cartQuantityFail, cartQuantityPass } from './cartQuantity.testData';

describe('useCouponAvailable', () => {
  describe('최소 주문금액이 100,000원 인 쿠폰 테스트 ', () => {
    it('주문 금액이 최소 주문 금액(100,000) 이상일 경우 쿠폰을 사용할 수 있다.', async () => {
      const { result } = renderHook(() => useCouponAvailable(), {
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[0])).toBe(true);
      });
    });
    it('주문 금액이 최소 주문 금액(10,000) 이하일 경우 쿠폰을 사용할 수 없다.', async () => {
      const { result } = renderHook(() => useCouponAvailable(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              cartQuantityFail.forEach((isCartItemQuantity) =>
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[0])).toBe(false);
      });
    });
  });

  describe('BOGO 쿠폰 Available 테스트', () => {
    it('주문 수량이 3개 이상인 제품이 있다면 사용 가능하다.', async () => {
      const { result } = renderHook(() => useCouponAvailable(), {
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[1])).toBe(true);
      });
    });
    it('주문 수량이 3개 이상인 제품이 없다면 사용할 수 없다.', async () => {
      const { result } = renderHook(() => useCouponAvailable(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              cartQuantityFail.forEach((isCartItemQuantity) =>
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[1])).toBe(false);
      });
    });
  });

  describe('MIRACLESALE 쿠폰 available 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    it('시간이 04~07 일 경우 쿠폰 사용이 가능하다.', async () => {
      const testTime = new Date('2025-07-10T05:00:00');
      jest.setSystemTime(testTime);

      const { result } = renderHook(() => useCouponAvailable(), {
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[3])).toBe(true);
      });
    });
    it('시간이 04~07 가 아닐 경우 쿠폰 사용이 불가능하다.', async () => {
      const testTime = new Date('2025-07-10T15:00:00');
      jest.setSystemTime(testTime);

      const { result } = renderHook(() => useCouponAvailable(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);

              cartQuantityFail.forEach((isCartItemQuantity) =>
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[3])).toBe(false);
      });
    });
  });

  describe('BOGO 쿠폰 Available 테스트', () => {
    it('주문 수량이 3개 이상인 제품이 있다면 사용 가능하다.', async () => {
      const { result } = renderHook(() => useCouponAvailable(), {
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[1])).toBe(true);
      });
    });
    it('주문 수량이 3개 이상인 제품이 없다면 사용할 수 없다.', async () => {
      const { result } = renderHook(() => useCouponAvailable(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);

              cartQuantityFail.forEach((isCartItemQuantity) =>
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[1])).toBe(false);
      });
    });
  });

  describe('쿠폰 유효기간 테스트', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    afterAll(() => {
      jest.useRealTimers();
    });

    it('쿠폰 유효기간이 지났을 경우 쿠폰 사용이 불가하다.', async () => {
      /**
       * 현재 시간을 2026년 7월로 설정
       * 쿠폰 유효기간은 2025-11-30 이다.
       */
      const testTime = new Date('2026-07-10T15:00:00');
      jest.setSystemTime(testTime);

      const { result } = renderHook(() => useCouponAvailable(), {
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[0])).toBe(false);
      });
    });
    it('쿠폰 유효기간이 지나지 않았을 경우 쿠폰 사용이 가능하다.', async () => {
      /**
       * 현재 시간을 2025년 7월로 설정
       * 쿠폰 유효기간은 2025-11-30 이다.
       */
      const testTime = new Date('2025-07-10T05:00:00');
      jest.setSystemTime(testTime);

      const { result } = renderHook(() => useCouponAvailable(), {
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

      await waitFor(() => {
        expect(result.current.isCouponAvailable(mockCoupons[0])).toBe(true);
      });
    });
  });
});
