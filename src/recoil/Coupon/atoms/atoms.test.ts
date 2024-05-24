import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { selectedCouponIdListState, totalDiscountPriceState } from './atoms';

describe('selectedCouponIdListState', () => {
  it('초기 배열은 빈 배열이다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponIdListState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toBe(0);
  });

  it('배열에 데이터를 삽입할 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponIdListState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1]([1, 2, 3, 4]));

    expect(result.current[0].length).toBe(4);
  });
});

describe('totalDiscountPriceState', () => {
  it('초기 상태는 0 이다.', () => {
    const { result } = renderHook(() => useRecoilState(totalDiscountPriceState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toBe(0);
  });

  it('상태를 변화시킬 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(totalDiscountPriceState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](1000));

    expect(result.current[0]).toBe(1000);
  });
});
