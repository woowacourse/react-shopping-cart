import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useFarDeliverySelect from '../useFarDeliverySelect';

describe('useFarDeliverySelect', () => {
  it('초기 상태는 false여야 한다.', () => {
    const { result } = renderHook(() => useFarDeliverySelect());
    expect(result.current.isFarDelivery).toBe(false);
  });

  it('handleFarDeliverySelect를 호출하면 상태가 true로 변경되어야 한다.', () => {
    const { result } = renderHook(() => useFarDeliverySelect());

    act(() => {
      result.current.handleFarDeliverySelect();
    });

    expect(result.current.isFarDelivery).toBe(true);
  });

  it('handleFarDeliverySelect를 두 번 호출하면 상태가 다시 false로 변경되어야 한다.', () => {
    const { result } = renderHook(() => useFarDeliverySelect());

    act(() => {
      result.current.handleFarDeliverySelect();
    });
    act(() => {
      result.current.handleFarDeliverySelect();
    });

    expect(result.current.isFarDelivery).toBe(false);
  });
});
