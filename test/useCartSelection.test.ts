import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartSelection } from '../src/hooks/useCartSelection';
import { CartProduct } from '../src/types/cart';

describe('useCartSelection', () => {
  const mockCartItems = {
    content: [
      {
        id: 1,
        quantity: 1,
        product: { id: 101, name: '상품1', price: 10000, imageUrl: '', category: '패션잡화' },
      },
      {
        id: 2,
        quantity: 2,
        product: { id: 102, name: '상품2', price: 20000, imageUrl: '', category: '식료품' },
      },
      {
        id: 3,
        quantity: 1,
        product: { id: 103, name: '상품3', price: 30000, imageUrl: '', category: '식료품' },
      },
    ] as CartProduct[],
  };

  it('초기 상태에서 모든 아이템이 선택되어야 한다', () => {
    const { result } = renderHook(() => useCartSelection(mockCartItems));

    expect(result.current.checkedItems).toEqual([1, 2, 3]);
    expect(result.current.isAllChecked).toBe(true);
  });

  it('개별 아이템 토글이 정상적으로 동작해야 한다', () => {
    const { result } = renderHook(() => useCartSelection(mockCartItems));

    act(() => {
      result.current.toggleItem(2);
    });

    expect(result.current.checkedItems).toEqual([1, 3]);
    expect(result.current.isAllChecked).toBe(false);
  });

  it('전체 선택/해제가 정상적으로 동작해야 한다', () => {
    const { result } = renderHook(() => useCartSelection(mockCartItems));

    // 전체 선택 해제
    act(() => {
      result.current.checkAll(false);
    });

    expect(result.current.checkedItems).toEqual([]);
    expect(result.current.isAllChecked).toBe(false);

    // 다시 전체 선택
    act(() => {
      result.current.checkAll(true);
    });

    expect(result.current.checkedItems).toEqual([1, 2, 3]);
    expect(result.current.isAllChecked).toBe(true);
  });

  it('전체 선택 해제가 정상적으로 동작해야 한다', () => {
    const { result } = renderHook(() => useCartSelection(mockCartItems));

    act(() => {
      result.current.checkAll(false);
    });

    expect(result.current.checkedItems).toEqual([]);
    expect(result.current.isAllChecked).toBe(false);
  });
});
