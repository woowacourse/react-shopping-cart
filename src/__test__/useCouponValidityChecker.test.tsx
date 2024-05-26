import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DefaultValue, RecoilRoot, RecoilState } from 'recoil';
import { cartItemsState, checkedCartItemsState } from '../recoil/atoms';
import { useCouponValidityChecker } from '../hooks';
import mockCoupons from './data/mockCoupons';
import mockCartItems from './data/mockCartItems';

type RecoilStateSetType = <T>(atom: RecoilState<T>, value: T | DefaultValue) => void;

describe('useCouponValidityChecker', () => {
  beforeEach(() => {
    vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024);
    vi.spyOn(Date.prototype, 'getMonth').mockReturnValue(5);
    vi.spyOn(Date.prototype, 'getDate').mockReturnValue(24);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const initializeState = ({ set }: { set: RecoilStateSetType }) => {
    set(cartItemsState, mockCartItems);
    set(checkedCartItemsState, [2]);
  };

  it('만료 기한이 지나지 않았으며 다른 조건이 존재하지 않는 쿠폰은 사용자가 선택할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const notExpiredCoupon = { ...mockCoupons[0], minimumAmount: undefined };
    expect(result.current.isCouponValid(notExpiredCoupon)).toBe(true);
  });

  it('쿠폰 사용에 필요한 최소 주문 금액이 존재하며 사용자의 주문 금액이 이에 미치지 못한 경우, 해당 쿠폰은 사용자가 선택할 수 없어야 한다.', () => {
    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const couponWithMinimumAmount = mockCoupons[0];
    expect(result.current.isCouponValid(couponWithMinimumAmount)).toBe(false);
  });

  it('쿠폰 사용에 필요한 최소 주문 금액이 존재하며 사용자의 주문 금액이 해당 금액 이상인 경우, 해당 쿠폰은 사용자가 선택할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const couponWithMinimumAmount = { ...mockCoupons[0], minimumAmount: 60000 };
    expect(result.current.isCouponValid(couponWithMinimumAmount)).toBe(false);
  });

  it('만료 기한이 지난 쿠폰은 사용자가 선택할 수 없어야 한다.', () => {
    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const expiredCoupon = { ...mockCoupons[0], expirationDate: '2022-12-31' };
    expect(result.current.isCouponValid(expiredCoupon)).toBe(false);
  });

  it('사용 가능 시간대가 정해져 있으며, 사용 가능 시간대에 해당하는 쿠폰은 사용자가 선택할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const timeCoupon = mockCoupons[3];
    vi.spyOn(Date.prototype, 'getHours').mockReturnValue(4);
    expect(result.current.isCouponValid(timeCoupon)).toBe(false);
  });

  it('사용 가능 시간대가 정해져 있으며, 사용 가능 시간대가 아닌 쿠폰은 사용자가 선택할 수 없어야 한다.', () => {
    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const timeCoupon = mockCoupons[3];
    vi.spyOn(Date.prototype, 'getHours').mockReturnValue(20);
    expect(result.current.isCouponValid(timeCoupon)).toBe(false);
  });

  it('"X개 구매 시 Y개 무료" 유형의 쿠폰이고, 구매 상품들의 각 수량이 쿠폰 사용 조건인 "X개"보다 작거나 같을 때, 해당 쿠폰은 사용자가 선택할 수 없어야 한다.', () => {
    const newInitializeState = ({ set }: { set: RecoilStateSetType }) => {
      set(cartItemsState, [
        { ...mockCartItems[0], quantity: 2 },
        { ...mockCartItems[1], quantity: 2 },
      ]);
      set(checkedCartItemsState, [1, 2]);
    };

    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={newInitializeState}>{children}</RecoilRoot>
      ),
    });

    const buyXgetYCoupon = mockCoupons[1];
    expect(result.current.isCouponValid(buyXgetYCoupon)).toBe(false);
  });

  it('"X개 구매 시 Y개 무료" 유형의 쿠폰이고, 구매 상품들의 각 수량이 쿠폰 사용 조건인 "X개"보다 클 때, 해당 쿠폰은 사용자가 선택할 수 있어야 한다.', () => {
    const newInitializeState = ({ set }: { set: RecoilStateSetType }) => {
      set(cartItemsState, [
        { ...mockCartItems[0], quantity: 3 },
        { ...mockCartItems[1], quantity: 2 },
      ]);
      set(checkedCartItemsState, [1, 2]);
    };

    const { result } = renderHook(() => useCouponValidityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={newInitializeState}>{children}</RecoilRoot>
      ),
    });

    const buyXgetYCoupon = mockCoupons[1];
    expect(result.current.isCouponValid(buyXgetYCoupon)).toBe(true);
  });
});
