import { RecoilRoot } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import useApiErrorState from './useApiErrorState';
import { FailedFetchCartItemListError } from '../../error/customError';

describe('useApiErrorState', () => {
  it('초기 apiError 상태는 null이어야 한다.', () => {
    const { result } = renderHook(() => useApiErrorState(), {
      wrapper: RecoilRoot,
    });
    expect(result.current.apiError).toBe(null);
  });

  it('setApiError는 apiError 상태를 주어진 Error로 설정해야 한다.', () => {
    const { result } = renderHook(() => useApiErrorState(), {
      wrapper: RecoilRoot,
    });
    act(() => {
      result.current.setApiError(new FailedFetchCartItemListError());
    });
    expect(result.current.apiError).toBeInstanceOf(
      FailedFetchCartItemListError,
    );
  });

  it('resetApiError는 apiError 상태를 null로 초기화해야 한다.', () => {
    const { result } = renderHook(() => useApiErrorState(), {
      wrapper: RecoilRoot,
    });
    act(() => {
      result.current.setApiError(new FailedFetchCartItemListError());
    });
    act(() => {
      result.current.resetApiError();
    });
    expect(result.current.apiError).toBe(null);
  });
});
