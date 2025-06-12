import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartSelection } from '../src/hooks/useCartSelection';
import { CartProduct } from '../src/types/cart';
import React from 'react';
import { DataContext } from '../src/context/DataContext';

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

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DataContext.Provider value={{ data: { cartItems: mockCartItems }, setData: vi.fn() }}>
      {children}
    </DataContext.Provider>
  );

  it('초기 상태에서 모든 아이템이 선택되어야 한다', () => {
    const { result } = renderHook(() => useCartSelection(), { wrapper });

    // useEffect가 실행될 때까지 기다림
    act(() => {
      // force re-render
    });

    expect(result.current.checkedItems).toEqual([1, 2, 3]);
    expect(result.current.isAllChecked).toBe(true);
  });

  it('개별 아이템 토글이 정상적으로 동작해야 한다', () => {
    const { result } = renderHook(() => useCartSelection(), { wrapper });

    act(() => {});

    act(() => {
      result.current.toggleItem(2);
    });

    expect(result.current.checkedItems).toEqual([1, 3]);
    expect(result.current.isAllChecked).toBe(false);
  });

  it('전체 선택/해제가 정상적으로 동작해야 한다', () => {
    const { result } = renderHook(() => useCartSelection(), { wrapper });

    act(() => {});

    act(() => {
      result.current.checkAll(false);
    });

    expect(result.current.checkedItems).toEqual([]);
    expect(result.current.isAllChecked).toBe(false);

    act(() => {
      result.current.checkAll(true);
    });

    expect(result.current.checkedItems).toEqual([1, 2, 3]);
    expect(result.current.isAllChecked).toBe(true);
  });

  it('전체 선택 해제가 정상적으로 동작해야 한다', () => {
    const { result } = renderHook(() => useCartSelection(), { wrapper });

    act(() => {
      result.current.checkAll(false);
    });

    expect(result.current.checkedItems).toEqual([]);
    expect(result.current.isAllChecked).toBe(false);
  });
});
