import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { isSigolState, selectedCartItemListState } from './atoms';
import { mockCartItems } from '../../../mocks/cartItems';

describe('selectedCartItemListState', () => {
  it('초기 배열은 빈 배열이다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItemListState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toBe(0);
  });

  it('배열에 데이터를 삽입할 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItemListState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockCartItems));

    expect(result.current[0].length).toBe(5);
  });
});

describe('isSigolState', () => {
  it('초기 상태는 false 이다.', () => {
    const { result } = renderHook(() => useRecoilState(isSigolState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toBe(false);
  });

  it('상태를 true 로 변화시킬 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(isSigolState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](true));

    expect(result.current[0]).toBe(true);
  });
});
