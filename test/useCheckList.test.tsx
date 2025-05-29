import { act, renderHook } from '@testing-library/react';
import { useCheckList } from '../src/hooks/useCheckList';
import cartItems from '../src/mocks/data/cartItems.json';
import { describe, it, expect } from 'vitest';

describe('useCheckList Test', () => {
  it('페이지 진입 시 모든 상품이 선택된 상태여야 한다.', () => {
    const { result } = renderHook(() => useCheckList(cartItems.content, (item) => item.id));

    expect(result.current.isAllChecked).toBe(true);
  });

  it('toggle 호출 시 해당 항목의 체크 상태가 반전되어야 한다.', () => {
    const { result } = renderHook(() => useCheckList(cartItems.content, (item) => item.id));

    expect(result.current.state.get(1551)).toBe(true);

    act(() => result.current.toggle(cartItems.content[0].id));
    expect(result.current.state.get(1551)).toBe(false);
  });

  it('unCheckAll, checkAll 호출 시 모든 항목의 체크 상태가 반전되어야 한다.', () => {
    const { result } = renderHook(() => useCheckList(cartItems.content, (item) => item.id));

    act(() => result.current.uncheckAll());
    cartItems.content.forEach((item) => {
      expect(result.current.state.get(item.id)).toBe(false);
    });

    act(() => result.current.checkAll());
    cartItems.content.forEach((item) => {
      expect(result.current.state.get(item.id)).toBe(true);
    });
  });
});
