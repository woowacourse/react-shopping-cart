import { mockCoupons } from '@mocks/coupons';
import { mockCartItems, mockCartItemsOverTenThousands } from '@mocks/cartItems';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { isolatedRegionStore, selectedCartItems, selectedCoupons } from '@recoil/atoms';
import useDiscount from './useDiscount';

describe('useDiscount test', () => {
  describe('context: fixed 적용 금액 테스트', () => {
    it('총액이 10만원이 넘는 금액일 때 쿠폰을 적용하면 5000원이 할인된다.', () => {
      const { result } = renderHook(() => useDiscount(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItems, mockCartItemsOverTenThousands);
              set(selectedCoupons, [mockCoupons[0]]);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.discountAmount).toBe(5000);
    });
  });

  describe('context: BOGO 적용 금액 테스트', () => {
    it('15000원 2개, 20000원 1개에서 쿠폰을 적용하면 15000원이 할인된다.', () => {
      const { result } = renderHook(() => useDiscount(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItems, mockCartItems);
              set(selectedCoupons, [mockCoupons[1]]);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.discountAmount).toBe(15000);
    });
  });

  describe('context: FREESHIPPING 적용 금액 테스트', () => {
    it('50000원 이상에서 쿠폰을 적용하면 (도서지역 이외) 3000원이 할인된다.', () => {
      const { result } = renderHook(() => useDiscount(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItems, mockCartItems);
              set(selectedCoupons, [mockCoupons[2]]);
              set(isolatedRegionStore, false);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.discountAmount).toBe(3000);
    });
    it('50000원 이상에서 쿠폰을 적용하면 (도서지역) 6000원이 할인된다.', () => {
      const { result } = renderHook(() => useDiscount(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItems, mockCartItems);
              set(selectedCoupons, [mockCoupons[2]]);
              set(isolatedRegionStore, true);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.discountAmount).toBe(6000);
    });
    it('100000원 이상에서 쿠폰을 적용하면 (원래 배송비 무료) 할인되지 않는다.', () => {
      const { result } = renderHook(() => useDiscount(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItems, mockCartItemsOverTenThousands);
              set(selectedCoupons, [mockCoupons[2]]);
              set(isolatedRegionStore, false);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.discountAmount).toBe(0);
    });
  });

  describe('context: MIRACLESALE 적용 금액 테스트', () => {
    it('쿠폰을 적용하면 30%할인된다.', () => {
      const { result } = renderHook(() => useDiscount(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItems, mockCartItems);
              set(selectedCoupons, [mockCoupons[3]]);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.discountAmount).toBe(50000 * 0.3);
    });
  });

  describe('context: MIRACLESALE & Fixed 중복 적용 금액 테스트', () => {
    it('두 쿠폰을 동시에 적용했을 때, 두 혜택을 모두 받을 수 있다.', () => {
      const { result } = renderHook(() => useDiscount(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItems, mockCartItemsOverTenThousands);
              set(selectedCoupons, [mockCoupons[3], mockCoupons[0]]);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      expect(result.current.discountAmount).toBe(120000 * 0.3 + 5000);
    });
  });
});
