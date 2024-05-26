import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { DefaultValue, RecoilRoot, RecoilState } from 'recoil';
import { cartItemsState, checkedCartItemsState } from '../recoil/atoms';

import useDiscountCalculator from '../hooks/useDiscountCalculator';
import mockCartItems from './data/mockCartItems';
import mockCoupons from './data/mockCoupons';

type RecoilStateSetType = <T>(atom: RecoilState<T>, value: T | DefaultValue) => void;

describe('useDiscountCalculator', () => {
  const initializeState = ({ set }: { set: RecoilStateSetType }) => {
    set(cartItemsState, mockCartItems);
    set(checkedCartItemsState, [2]);
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

  it('비율 할인 쿠폰의 경우, 할인 금액은 현재 총 금액에 비율을 곱한 값이어야 한다', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
    );

    const { result } = renderHook(() => useDiscountCalculator(), { wrapper });
    const percentageDiscountCoupon = { ...mockCoupons[3], availableTime: undefined };
    const discountPercentage = percentageDiscountCoupon.discount;
    const currentTotalAmount = 100000;

    expect(
      result.current.getDiscountAmountByCoupon(percentageDiscountCoupon, currentTotalAmount),
    ).toBe((currentTotalAmount * discountPercentage) / 100);
  });

  it('X개 구매시 Y개 증정 쿠폰의 경우 할인 금액은 가장 비싼 상품의 가격에 getQuantity를 곱한 값이어야 한다', () => {
    const newInitializeState = ({ set }: { set: RecoilStateSetType }) => {
      set(cartItemsState, mockCartItems);
      set(checkedCartItemsState, [2, 3]);
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot initializeState={newInitializeState}>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useDiscountCalculator(), { wrapper });
    const buyXgetYCoupon = mockCoupons[1];
    const maxProductPrice = Math.max(
      ...mockCartItems.filter((item) => [2, 3].includes(item.id)).map((item) => item.product.price),
    );
    const currentTotalAmount = 100000;

    expect(result.current.getDiscountAmountByCoupon(buyXgetYCoupon, currentTotalAmount)).toBe(
      maxProductPrice,
    );
  });
});
