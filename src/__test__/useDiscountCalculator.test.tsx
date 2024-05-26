import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { DefaultValue, RecoilRoot, RecoilState, useRecoilValue } from 'recoil';
import { cartItemsState, checkedCartItemIdsState, couponsState } from '../recoil/atoms';
import { shippingCostState } from '../recoil/selectors';

import useDiscountCalculator from '../hooks/useDiscountCalculator';
import mockCartItems from './data/mockCartItems';
import mockCoupons from './data/mockCoupons';

type RecoilStateSetType = <T>(atom: RecoilState<T>, value: T | DefaultValue) => void;

describe('useDiscountCalculator', () => {
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
    set(checkedCartItemIdsState, [2]);
    set(couponsState, mockCoupons);
  };

  it('쿠폰이 유효하지 않으면, 할인 금액은 0이어야 한다.', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useDiscountCalculator(), { wrapper });

    const invalidCoupon = { ...mockCoupons[0], expirationDate: '2022-01-01' };
    const currentTotalAmount = 30000;

    expect(result.current.getDiscountAmountByCoupon(invalidCoupon, currentTotalAmount)).toBe(0);
  });

  it('고정 할인 쿠폰의 경우 할인 금액은 쿠폰의 discount 값과 일치해야 한다.', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
    );

    const { result } = renderHook(() => useDiscountCalculator(), { wrapper });
    const validCoupon = { ...mockCoupons[0], minimumAmount: 0 };
    const currentTotalAmount = 150000;

    expect(result.current.getDiscountAmountByCoupon(validCoupon, currentTotalAmount)).toBe(5000);
  });

  it('비율 할인 쿠폰의 경우, 할인 금액은 현재 총 금액에 비율을 곱한 값이어야 한다.', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
    );

    const { result } = renderHook(() => useDiscountCalculator(), { wrapper });
    const percentageDiscountCoupon = { ...mockCoupons[3], availableTime: undefined };
    const discountPercentage = percentageDiscountCoupon.discount!;
    const currentTotalAmount = 100000;

    expect(
      result.current.getDiscountAmountByCoupon(percentageDiscountCoupon, currentTotalAmount),
    ).toBe((currentTotalAmount * discountPercentage) / 100);
  });

  it('X개 구매시 Y개 증정 쿠폰의 경우, 할인 금액은 가장 높은 가격이면서 쿠폰의 최소 주문 수량 조건을 충족하는 상품의 가격에 getQuantity를 곱한 값이어야 한다.', () => {
    const newInitializeState = ({ set }: { set: RecoilStateSetType }) => {
      set(cartItemsState, [
        { ...mockCartItems[1], quantity: 3 },
        { ...mockCartItems[2], quantity: 3 },
      ]);
      set(checkedCartItemIdsState, [2, 3]);
      set(couponsState, mockCoupons);
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={newInitializeState}>{children}</RecoilRoot>
    );

    const { result } = renderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsState);
        const checkedCartItemIds = useRecoilValue(checkedCartItemIdsState);
        const checkedCartItems = cartItems.filter((item) => checkedCartItemIds.includes(item.id));
        return {
          useDiscountCalculator: useDiscountCalculator(),
          checkedCartItems,
        };
      },
      { wrapper },
    );

    const buyXgetYCoupon = mockCoupons[1];
    const maxProductPrice = Math.max(
      ...result.current.checkedCartItems
        .filter((item) => buyXgetYCoupon.buyQuantity && item.quantity > buyXgetYCoupon.buyQuantity)
        .map((item) => item.product.price),
    );
    const currentTotalAmount = 100000;

    expect(
      result.current.useDiscountCalculator.getDiscountAmountByCoupon(
        buyXgetYCoupon,
        currentTotalAmount,
      ),
    ).toBe(maxProductPrice);
  });

  it('X개 구매시 Y개 증정 쿠폰의 경우, 더 비싼 상품이 체크되어 있더라도 최소 주문 수량 조건을 만족하지 못한다면, 그 다음으로 비싼 상품의 가격에 getQuantity를 곱한 값이 할인되어야 한다.', () => {
    const newInitializeState = ({ set }: { set: RecoilStateSetType }) => {
      set(cartItemsState, [
        { ...mockCartItems[1], quantity: 3 },
        { ...mockCartItems[2], quantity: 2 },
      ]);
      set(checkedCartItemIdsState, [2, 3]);
      set(couponsState, mockCoupons);
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={newInitializeState}>{children}</RecoilRoot>
    );

    const { result } = renderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsState);
        const checkedCartItemIds = useRecoilValue(checkedCartItemIdsState);
        const checkedCartItems = cartItems.filter((item) => checkedCartItemIds.includes(item.id));
        return {
          useDiscountCalculator: useDiscountCalculator(),
          checkedCartItems,
        };
      },
      { wrapper },
    );

    const buyXgetYCoupon = mockCoupons[1];
    const maxProductPrice = Math.max(
      ...result.current.checkedCartItems
        .filter((item) => buyXgetYCoupon.buyQuantity && item.quantity > buyXgetYCoupon.buyQuantity)
        .map((item) => item.product.price),
    );
    const currentTotalAmount = 100000;

    expect(
      result.current.useDiscountCalculator.getDiscountAmountByCoupon(
        buyXgetYCoupon,
        currentTotalAmount,
      ),
    ).toBe(maxProductPrice);
  });

  it('무료 배송 쿠폰의 경우, 할인 금액은 현재 주문 금액 기준의 배송료와 일치해야 한다.', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
    );

    const { result } = renderHook(
      () => {
        const shippingCost = useRecoilValue(shippingCostState);
        return {
          useDiscountCalculator: useDiscountCalculator(),
          shippingCost,
        };
      },
      { wrapper },
    );

    const freeShippingCoupon = { ...mockCoupons[2] };
    const currentTotalAmount = 50000;

    expect(
      result.current.useDiscountCalculator.getDiscountAmountByCoupon(
        freeShippingCoupon,
        currentTotalAmount,
      ),
    ).toBe(result.current.shippingCost);
  });
});
