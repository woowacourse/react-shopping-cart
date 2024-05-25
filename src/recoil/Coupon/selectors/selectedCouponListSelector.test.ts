import { act } from 'react';
import { RecoilRoot, useRecoilCallback, useRecoilValue } from 'recoil';

import { renderHook } from '@testing-library/react';

import { couponMockData } from '../../../data/couponsMockData';
import { Coupon } from '../../../types/Coupon.type';
import { selectedCouponListState } from '../atoms/selectedCouponListState';
import { selectedCouponListSelector } from './selectedCouponListSelector';

describe('selectedCouponListSelector', () => {
  it('선택된 쿠폰이 올바르게 추가된다.', () => {
    const { result } = renderHook(
      () => {
        const selectedCouponList = useRecoilValue(selectedCouponListState);
        const setSelectedCoupon = useRecoilCallback(({ set }) => (coupon: Coupon) => {
          set(selectedCouponListSelector(coupon), true);
        });

        return { selectedCouponList, setSelectedCoupon };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCoupon(couponMockData[0]);
    });
    expect(result.current.selectedCouponList).toHaveLength(1);
    expect(result.current.selectedCouponList[0].code).toBe(couponMockData[0].code);
  });

  it('선택된 쿠폰이 올바르게 제거된다.', () => {
    const { result } = renderHook(
      () => {
        const selectedCouponList = useRecoilValue(selectedCouponListState);
        const setSelectedCoupon = useRecoilCallback(({ set }) => (coupon: Coupon) => {
          set(selectedCouponListSelector(coupon), false);
        });

        return { selectedCouponList, setSelectedCoupon };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCoupon(couponMockData[0]);
    });

    act(() => {
      result.current.setSelectedCoupon(couponMockData[0]);
    });

    expect(result.current.selectedCouponList).toHaveLength(0);
  });

  it('최대 2개의 쿠폰만 선택 가능하다.', () => {
    const { result } = renderHook(
      () => {
        const selectedCouponList = useRecoilValue(selectedCouponListState);
        const setSelectedCoupon = useRecoilCallback(({ set }) => (coupon: Coupon) => {
          set(selectedCouponListSelector(coupon), true);
        });

        return { selectedCouponList, setSelectedCoupon };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedCoupon(couponMockData[1]);
      result.current.setSelectedCoupon(couponMockData[2]);
    });

    act(() => {
      result.current.setSelectedCoupon(couponMockData[3]);
    });

    expect(result.current.selectedCouponList).toHaveLength(2);
  });
});
