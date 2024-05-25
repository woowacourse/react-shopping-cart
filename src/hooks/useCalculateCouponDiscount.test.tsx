import { RecoilRoot } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { cartItemListMockData } from '../mockData/cartItemListMockData';
import { couponListMockData } from '../mockData/couponListMockData';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/selectedCartItemListState';
import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { deliveryFeeState } from '../recoil/DeliveryFee/atoms/deliveryFeeState';
import { useCalculateCouponDiscount, useCalculateTotalCouponDiscount } from './useCalculateCouponDiscount';

describe('useCalculateCouponDiscount', () => {
  it('discountType가 fixed인 쿠폰은 discount만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: RecoilRoot,
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 10000;

    expect(calculateCouponDiscount(currentTotalPrice, couponListMockData[0])).toEqual(5000);
  });

  it('discountType가 buyXgetY인 쿠폰은 가장 비싼 물건 1개의 가격만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemListState, cartItemListMockData);
            set(selectedCouponListState, couponListMockData);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 103000;
    expect(calculateCouponDiscount(currentTotalPrice, couponListMockData[1])).toEqual(20000);
  });

  it('discountType가 freeShipping인 쿠폰은 배송비만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(deliveryFeeState, 3000);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 200;

    expect(calculateCouponDiscount(currentTotalPrice, couponListMockData[2])).toEqual(3000);
  });

  it('discountType가 percentage인 쿠폰은 전체 금액의 discount% 만큼 할인해야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: RecoilRoot,
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 10000;

    expect(calculateCouponDiscount(currentTotalPrice, couponListMockData[3])).toEqual(3000);
  });

  it('discountType가 존재하지 않는 타입인 경우 할인이 적용되지 않아야 한다.', () => {
    const { result } = renderHook(() => useCalculateCouponDiscount(), {
      wrapper: RecoilRoot,
    });
    const calculateCouponDiscount = result.current.calculateCouponDiscount;
    const currentTotalPrice = 100;

    expect(calculateCouponDiscount(currentTotalPrice, couponListMockData[4])).toEqual(0);
  });
});

describe('useCalculateTotalCouponDiscount', () => {
  it('만약 모든 4개의 쿠폰이 적용될 수 있다고 가정했을 때, 가장 할인률이 높은 순으로 할인이 적용되어야 한다.', () => {
    const { result } = renderHook(() => useCalculateTotalCouponDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemListState, cartItemListMockData);
            set(selectedCouponListState, couponListMockData);
            set(deliveryFeeState, 3000);
            set(selectedCartItemListTotalPriceSelector, 90000);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => {
      result.current.calculateTotalCouponDiscount();
    });

    expect(result.current.selectedCouponTotalDiscount).toEqual(77500);
  });
});
