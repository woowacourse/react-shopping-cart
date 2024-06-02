import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { activeCouponCodesState, couponsState } from '../src/store/couponStore';
import { isCheckedState, productsState } from '../src/store/productStore';
import useCouponList from '../src/hooks/coupon/useCouponList';
import {
  mockChecked,
  mockCoupons,
  mockFIXED5000,
  mockBOGO,
  mockFREESHIPPING,
  mockMIRACLESALE,
  mockProductAmount10_000,
  mockProductAmount100_000,
  mockProductQuantity1,
  mockProductQuantity3,
} from './mock';

const setFakeTimer = (date: string) => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(date));
};

describe('useCouponList hook 테스트', () => {
  describe('쿠폰 이용 가능성 테스트 - 쿠폰 만료일', () => {
    afterAll(() => {
      jest.useRealTimers();
    });

    it('쿠폰 사용일이 2024년 12월 1일이라면, 만료일이 2024년 11월 30일인 FIXED5000 쿠폰은 availableCoupons에 들어가지 않는다.', async () => {
      setFakeTimer('2024-12-01');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount100_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockFIXED5000);
        expect(result.current.unAvailableCoupons).toContainEqual(mockFIXED5000);
      });
    });

    it('쿠폰 사용일이 2024년 6월 1일이라면, 만료일이 2024년 5월 30일인 BOGO 쿠폰은 availableCoupons에 들어가지 않는다.', async () => {
      setFakeTimer('2024-06-01');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount100_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockBOGO);
        expect(result.current.unAvailableCoupons).toContainEqual(mockBOGO);
      });
    });

    it('쿠폰 사용일이 2024년 9월 1일이라면, 만료일이 2024년 8월 31일인 FREESHIPPING 쿠폰은 availableCoupons에 들어가지 않는다.', async () => {
      setFakeTimer('2024-09-01');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount100_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockFREESHIPPING);
        expect(result.current.unAvailableCoupons).toContainEqual(mockFREESHIPPING);
      });
    });

    it('쿠폰 사용일이 2024년 8월 1일이라면, 만료일이 2024년 7월 31일인 MIRACLESALE 쿠폰은 availableCoupons에 들어가지 않는다.', async () => {
      setFakeTimer('2024-08-01');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount100_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockMIRACLESALE);
        expect(result.current.unAvailableCoupons).toContainEqual(mockMIRACLESALE);
      });
    });
  });

  describe('쿠폰 이용 가능성 테스트 - FIXED5000', () => {
    beforeAll(() => {
      setFakeTimer('2024-01-01');
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('만료일 이내지만 주문 금액이 10만원 이하라면, FIXED5000 쿠폰은 availableCoupons에 들어가지 않고 unAvailableCoupons에 들어간다..', async () => {
      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount10_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockFIXED5000);
        expect(result.current.unAvailableCoupons).toContainEqual(mockFIXED5000);
      });
    });

    it('만료일 이내이고 주문 금액이 10만원 이상이라면, FIXED5000 쿠폰은 availableCoupons에 들어간다', async () => {
      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount100_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).toContainEqual(mockFIXED5000);
        expect(result.current.unAvailableCoupons).not.toContainEqual(mockFIXED5000);
      });
    });
  });

  describe('쿠폰 이용 가능성 테스트 - BOGO', () => {
    beforeAll(() => {
      setFakeTimer('2024-01-01');
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('만료일 이내지만 상품 구매 수량이 3개 미만이라면, BOGO 쿠폰은 availableCoupons에 들어가지 않고 unAvailableCoupons에 들어간다..', async () => {
      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductQuantity1);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockBOGO);
        expect(result.current.unAvailableCoupons).toContainEqual(mockBOGO);
      });
    });

    it('만료일 이내이고 상품 구매 수량이 3개 이상이라면, BOGO 쿠폰은 availableCoupons에 들어간다', async () => {
      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductQuantity3);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).toContainEqual(mockBOGO);
        expect(result.current.unAvailableCoupons).not.toContainEqual(mockBOGO);
      });
    });
  });

  describe('쿠폰 이용 가능성 테스트 - FREESHIPPING', () => {
    beforeAll(() => {
      setFakeTimer('2024-01-01');
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('만료일 이내지만 주문 금액이 5만원 미만이라면, FREESHIPPING 쿠폰은 availableCoupons에 들어가지 않고 unAvailableCoupons에 들어간다..', async () => {
      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount10_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockFREESHIPPING);
        expect(result.current.unAvailableCoupons).toContainEqual(mockFREESHIPPING);
      });
    });

    it('만료일 이내이고 주문 금액이 5만원 이상이라면, FREESHIPPING 쿠폰은 availableCoupons에 들어간다', async () => {
      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount100_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).toContainEqual(mockFREESHIPPING);
        expect(result.current.unAvailableCoupons).not.toContainEqual(mockFREESHIPPING);
      });
    });
  });

  describe('쿠폰 이용 가능성 테스트 - MIRACLESALE', () => {
    afterAll(() => {
      jest.useRealTimers();
    });

    it('만료일 이내이고 사용 시간이 오전 4시부터 7시라면, MIRACLESALE 쿠폰은 availableCoupons에 들어간다', async () => {
      setFakeTimer('2024-07-01T06:00:00');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount10_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).toContainEqual(mockMIRACLESALE);
        expect(result.current.unAvailableCoupons).not.toContainEqual(mockMIRACLESALE);
      });
    });

    it('만료일 이내지만 사용 시간이 오전 4시부터 7시가 아니라면, MIRACLESALE 쿠폰은 availableCoupons에 들어가지 않고 unAvailableCoupons에 들어간다.', async () => {
      setFakeTimer('2024-07-01T07:00:01');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount10_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).not.toContainEqual(mockMIRACLESALE);
        expect(result.current.unAvailableCoupons).toContainEqual(mockMIRACLESALE);
      });
    });
  });

  describe('쿠폰 이용 가능성 테스트 - 모두 사용 가능', () => {
    afterAll(() => {
      jest.useRealTimers();
    });

    it('만료일 이내, 주문금액 10만원 이상, 한 상품을 3개 구매, 사용 시간 오전 4시~7시라면, FIXED5000, BOGO, FREESHIPPING, MIRACLESALE 쿠폰은 availableCoupons에 들어간다', async () => {
      setFakeTimer('2024-01-01T06:00:00');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount100_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).toEqual(mockCoupons);
        expect(result.current.unAvailableCoupons).toEqual([]);
      });
    });
  });

  describe('쿠폰 이용 가능성 테스트 - 모두 사용 불가능', () => {
    afterAll(() => {
      jest.useRealTimers();
    });

    it('만료일 이내, 주문금액 10,000원,  한 상품을 1개 구매, 사용 시간 오전 8시라면, 모든 쿠폰은 사용 불가능하다', async () => {
      setFakeTimer('2024-01-01T08:00:00');

      const { result } = renderHook(() => useCouponList(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(productsState, mockProductAmount10_000);
              set(isCheckedState, mockChecked);
              set(couponsState, mockCoupons);
              set(activeCouponCodesState, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.availableCoupons).toEqual([]);
        expect(result.current.unAvailableCoupons).toEqual(mockCoupons);
      });
    });
  });
});
