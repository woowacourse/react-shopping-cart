import { RecoilRoot, useRecoilState } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { deliveryFeeState } from './deliveryFeeState';

describe('deliveryFeeState', () => {
  it('초기값이 제대로 설정되어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(deliveryFeeState), {
      wrapper: RecoilRoot,
    });

    const [value] = result.current;
    expect(value).toEqual(0);
  });

  it('값을 설정할 수 있어야 한다', () => {
    const { result } = renderHook(() => useRecoilState(deliveryFeeState), {
      wrapper: RecoilRoot,
    });

    const newDeliveryFee = 3000;

    act(() => {
      result.current[1](newDeliveryFee);
    });

    const [value] = result.current;
    expect(value).toEqual(newDeliveryFee);
  });
});
