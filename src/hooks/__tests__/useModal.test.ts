import { act, renderHook } from '@testing-library/react';

import useModal from '../useModal';

describe('useModal', () => {
  it('useModal 훅은 isOpen, openModal, closeModal을 반환한다.', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.openModal).toBeDefined();
    expect(result.current.closeModal).toBeDefined();
  });

  it('openModal 함수는 isOpen을 true로 변경한다.', () => {
    const { result } = renderHook(() => useModal());

    act(() => result.current.openModal());

    expect(result.current.isOpen).toBe(true);
  });

  it('closeModal 함수는 isOpen을 false로 변경한다.', () => {
    const { result } = renderHook(() => useModal());

    act(() => result.current.closeModal());

    expect(result.current.isOpen).toBe(false);
  });
});
