import { RecoilRoot } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { useToggleModal } from './useToggleModal';

describe('useToggleModal', () => {
  it('모달 state를 올바르게 toggle해야 한다.', () => {
    const { result } = renderHook(() => useToggleModal(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
