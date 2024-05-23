import useApplicable from './useApplicable';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { selectedCartItems } from '../../recoil/atoms';
import mockCartItems from '../../mocks/cartItems';
import { mockCoupons } from '../../mocks/coupons';
import { CartItem } from '../../types/cartItem';
import dayjs from './../../utils/dayjs';

describe('쿠폰 적용가능 여부 테스트', () => {
  describe('context: fixed coupon', () => {
    it('총액이 100000원 미만이면 쿠폰이 적용되지 않는다.', () => {
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const fixedCoupon = mockCoupons[0];
      expect(result.current.isApplicable(fixedCoupon)).not.toBeTruthy();
    });
    it('총액이 100000원 이상이면 쿠폰이 적용된다.', () => {
      const item: CartItem = {
        id: 3,
        quantity: 2,
        product: {
          id: 3,
          name: '두식이',
          price: 40000,
          imageUrl: 'doosik',
          category: '고양이',
        },
      };
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(selectedCartItems, [...mockCartItems, item])}
          >
            {children}
          </RecoilRoot>
        ),
      });
      const fixedCoupon = mockCoupons[0];
      expect(result.current.isApplicable(fixedCoupon)).toBeTruthy();
    });
  });

  describe('context: buyXgetY coupon', () => {
    it('장바구니에 quantity가 2개 초과인 상품이 없다면 쿠폰이 적용되지 않는다.', () => {
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const buyXgetYCoupon = mockCoupons[1];
      expect(result.current.isApplicable(buyXgetYCoupon)).not.toBeTruthy();
    });
    it('장바구니에 quantity가 2개 초과인 상품이 있다면 쿠폰이 적용된다.', () => {
      const item: CartItem = {
        id: 3,
        quantity: 3,
        product: {
          id: 3,
          name: '두식이',
          price: 40000,
          imageUrl: 'doosik',
          category: '고양이',
        },
      };
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(selectedCartItems, [...mockCartItems, item])}
          >
            {children}
          </RecoilRoot>
        ),
      });
      const buyXgetYCoupon = mockCoupons[1];
      expect(result.current.isApplicable(buyXgetYCoupon)).toBeTruthy();
    });
  });

  describe('context: freeShipping coupon', () => {
    it('장바구니 총 금액이 freeShipping minimumAmount 기준보다 작을 때 쿠폰이 적용되지 않는다.', () => {
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, [mockCartItems[0]])}>
            {children}
          </RecoilRoot>
        ),
      });
      const freeShippingCoupon = mockCoupons[2];
      expect(result.current.isApplicable(freeShippingCoupon)).not.toBeTruthy();
    });
    it('장바구니 총 금액이 freeShipping minimumAmount 기준보다 크다면 쿠폰이 적용된다.', () => {
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const freeShippingCoupon = mockCoupons[2];
      expect(result.current.isApplicable(freeShippingCoupon)).toBeTruthy();
    });
  });

  describe('context: percentage coupon', () => {
    afterAll(() => {
      jest.useRealTimers();
    });

    it('시작시간보다 이를 때 쿠폰이 적용되지 않는다.', () => {
      jest.useFakeTimers();
      jest.setSystemTime(dayjs('2024-05-23T03:00:00').toDate());

      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const percentageCoupon = mockCoupons[3];
      expect(result.current.isApplicable(percentageCoupon)).not.toBeTruthy();
    });
    it('시작시간일 때 쿠폰이 적용된다.', () => {
      jest.useFakeTimers();
      jest.setSystemTime(dayjs('2024-05-23T04:00:00').toDate());
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const percentageCoupon = mockCoupons[3];
      expect(result.current.isApplicable(percentageCoupon)).toBeTruthy();
    });
    it('시작시간과 끝시간 사이일 때 쿠폰이 적용된다.', () => {
      jest.useFakeTimers();
      jest.setSystemTime(dayjs('2024-05-23T05:00:00').toDate());
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const percentageCoupon = mockCoupons[3];
      expect(result.current.isApplicable(percentageCoupon)).toBeTruthy();
    });
    it('끝시간일 때 쿠폰이 적용된다.', () => {
      jest.useFakeTimers();
      jest.setSystemTime(dayjs('2024-05-23T07:00:00').toDate());
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const percentageCoupon = mockCoupons[3];
      expect(result.current.isApplicable(percentageCoupon)).toBeTruthy();
    });
    it('끝시간 이후일 때 쿠폰이 적용되지 않는다.', () => {
      jest.useFakeTimers();
      jest.setSystemTime(dayjs('2024-05-23T08:00:00').toDate());
      const { result } = renderHook(() => useApplicable(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(selectedCartItems, mockCartItems)}>
            {children}
          </RecoilRoot>
        ),
      });
      const percentageCoupon = mockCoupons[3];
      expect(result.current.isApplicable(percentageCoupon)).not.toBeTruthy();
    });
  });
});
