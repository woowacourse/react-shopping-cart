import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useSelect from '../useSelect';
import mockCart from '../../mocks/mockCart.json';

describe('useSelect 훅 테스트', () => {
  it('초기 selectedItems의 상태 값이 세팅되고 isAllSelected의 상태 값은 true이다.', () => {
    const { result } = renderHook(() => useSelect(mockCart));

    expect(result.current.selectedItems).toEqual(
      mockCart.map((item) => item.id)
    );
    expect(result.current.isAllSelected).toBe(true);
  });

  it('selectedItems에서 상품이 제거된다.', async () => {
    const { result } = renderHook(() => useSelect(mockCart));

    await act(async () => {
      result.current.selectItem(mockCart[0].id);
    });

    expect(result.current.selectedItems).toEqual(
      mockCart
        .filter((item) => item.id !== mockCart[0].id)
        .map((item) => item.id)
    );
    expect(result.current.isAllSelected).toBe(false);
  });

  it('selectedItems에 상품이 추가된다.', async () => {
    const newCart = mockCart.filter((item) => item.id !== mockCart[0].id);

    const { result } = renderHook(() => useSelect(newCart));

    await act(async () => {
      result.current.selectItem(mockCart[0].id);
    });

    const newCartids = [...newCart.map((item) => item.id), mockCart[0].id];
    expect(result.current.selectedItems).toEqual(newCartids);
  });

  it('전체 선택된 상태에서 selectAllItems를 호출하면 모든 선택이 해제되고 다시 호출하면 전체가 선택된다.', async () => {
    const { result } = renderHook(() => useSelect(mockCart));

    await act(async () => {
      result.current.selectAllItems();
    });

    expect(result.current.selectedItems).toEqual([]);
    expect(result.current.isAllSelected).toBe(false);

    await act(async () => {
      result.current.selectAllItems();
    });

    expect(result.current.selectedItems).toEqual(
      mockCart.map((item) => item.id)
    );
    expect(result.current.isAllSelected).toBe(true);
  });
});
