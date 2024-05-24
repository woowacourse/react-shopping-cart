import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { selectedCouponListState } from './atoms';
import { mockCoupons } from '../../../mocks/coupons';

describe('selectedCouponListState', () => {
  it('초기 배열은 빈 배열이다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponListState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toBe(0);
  });

  it('배열에 데이터를 삽입할 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCouponListState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockCoupons));

    expect(result.current[0].length).toBe(4);
  });
});
