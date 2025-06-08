import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useSelect from '../useSelect';
import { CartItemProps } from '../../types/cartItem';

const MOCK_CART_LIST: CartItemProps[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: 'T-Shirt',
      price: 10000,
      imageUrl: 'url1',
      category: 'clothes',
    },
    quantity: 1,
  },
  {
    id: 2,
    product: {
      id: 2,
      name: 'Jeans',
      price: 30000,
      imageUrl: 'url2',
      category: 'clothes',
    },
    quantity: 1,
  },
  {
    id: 3,
    product: {
      id: 3,
      name: 'Shoes',
      price: 50000,
      imageUrl: 'url3',
      category: 'shoes',
    },
    quantity: 1,
  },
];

// localStorage Mock
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useSelect', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('초기 상태는 cartList의 모든 아이템 ID를 포함하는 Set이어야 한다.', () => {
    const { result } = renderHook(() => useSelect(MOCK_CART_LIST));
    expect(result.current.selectedItems).toBeInstanceOf(Set);
    expect(result.current.selectedItems.size).toBe(MOCK_CART_LIST.length);
    MOCK_CART_LIST.forEach((item) => {
      expect(result.current.selectedItems.has(item.id)).toBe(true);
    });
  });

  it('handleSelectItem을 호출하여 아이템 선택을 해제할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useSelect(MOCK_CART_LIST));
    act(() => {
      result.current.handleSelectItem(MOCK_CART_LIST[0].id);
    });
    expect(result.current.selectedItems.size).toBe(MOCK_CART_LIST.length - 1);
    expect(result.current.selectedItems.has(MOCK_CART_LIST[0].id)).toBe(false);
  });

  it('선택 해제된 아이템을 handleSelectItem으로 다시 선택할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useSelect(MOCK_CART_LIST));
    act(() => {
      result.current.handleSelectItem(MOCK_CART_LIST[0].id);
    });
    act(() => {
      result.current.handleSelectItem(MOCK_CART_LIST[0].id);
    });
    expect(result.current.selectedItems.size).toBe(MOCK_CART_LIST.length);
  });

  it('handleSelectAllItems를 호출하여 모든 아이템을 선택/해제할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useSelect(MOCK_CART_LIST));
    // 전체 해제
    act(() => {
      result.current.handleSelectAllItems();
    });
    expect(result.current.selectedItems.size).toBe(0);
    // 전체 선택
    act(() => {
      result.current.handleSelectAllItems();
    });
    expect(result.current.selectedItems.size).toBe(MOCK_CART_LIST.length);
  });

  it('localStorage에 저장된 선택 상태를 초기값으로 사용해야 한다.', () => {
    localStorage.setItem(
      'selectedItems',
      JSON.stringify([MOCK_CART_LIST[0].id, MOCK_CART_LIST[2].id])
    );

    const { result } = renderHook(() => useSelect(MOCK_CART_LIST));

    expect(result.current.selectedItems.size).toBe(2);
    expect(result.current.selectedItems.has(MOCK_CART_LIST[0].id)).toBe(true);
    expect(result.current.selectedItems.has(MOCK_CART_LIST[1].id)).toBe(false);
    expect(result.current.selectedItems.has(MOCK_CART_LIST[2].id)).toBe(true);
  });

  it('선택 상태가 변경되면 localStorage가 업데이트되어야 한다.', () => {
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    const { result } = renderHook(() => useSelect(MOCK_CART_LIST));

    act(() => {
      result.current.handleSelectItem(MOCK_CART_LIST[0].id);
    });

    const expectedIds = [MOCK_CART_LIST[1].id, MOCK_CART_LIST[2].id];
    expect(setItemSpy).toHaveBeenLastCalledWith(
      'selectedItems',
      JSON.stringify(expectedIds)
    );
  });
});
