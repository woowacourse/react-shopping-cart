import { act, renderHook } from '@testing-library/react';

import useModal from './useModal';

describe('useModal 훅 테스트', () => {
  it('초기 "modalOpened" 상태는 false 여야 한다.', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.modalOpened).toBe(false);
  });

  it('handleModalOpen 호출 시 modalOpened 상태가 true로 변경되어야 한다.', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.handleModalOpen();
    });
    expect(result.current.modalOpened).toBe(true);
  });

  it('handleModalClose 호출 시 modalOpened 상태가 false로 변경되어야 한다.', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.handleModalOpen();
    });
    act(() => {
      result.current.handleModalClose();
    });
    expect(result.current.modalOpened).toBe(false);
  });
});
