import { RecoilRoot, useRecoilState } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { selectedCouponListState } from './selectedCouponListState';

describe('selectedCouponListState', () => {
  it('초기값이 제대로 설정되어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponListState), {
      wrapper: RecoilRoot,
    });

    const [value] = result.current;
    expect(value).toEqual([]);
  });

  it('값을 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponListState), {
      wrapper: RecoilRoot,
    });

    const newCouponList = [
      {
        id: 1,
        code: 'FIXED5000',
        description: '5,000원 할인 쿠폰',
        expirationDate: '2024-11-30',
        discount: 5000,
        minimumAmount: 100000,
        discountType: 'fixed',
      },
    ];

    act(() => {
      result.current[1](newCouponList);
    });

    const [value] = result.current;
    expect(value).toEqual(newCouponList);
  });
});
