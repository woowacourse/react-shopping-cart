import { RecoilRoot, useRecoilState } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { selectedCouponTotalDiscountState } from './selectedCouponTotalDiscountState';

describe('selectedCouponTotalDiscountState', () => {
  it('초기값이 제대로 설정되어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponTotalDiscountState), {
      wrapper: RecoilRoot,
    });

    const [value] = result.current;
    expect(value).toEqual(0);
  });

  it('값을 설정할 수 있어야 한다', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponTotalDiscountState), {
      wrapper: RecoilRoot,
    });

    const newTotalDiscount = 3000;

    act(() => {
      result.current[1](newTotalDiscount);
    });

    const [value] = result.current;
    expect(value).toEqual(newTotalDiscount);
  });
});
