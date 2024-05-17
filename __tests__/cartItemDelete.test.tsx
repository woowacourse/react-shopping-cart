import { STORAGE_KEY } from '@constants/storage';
import { useDeleteCartItem } from '@hooks/shoppingCart';
import { cartItemsAtom, cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { INITIAL_ITEMS } from './constants/cartItems';

const localStorageMock = {
  storage: {} as Record<string, string>,
  length: 0,
  key(index: number): string | null {
    return Object.keys(this.storage)[index] || null;
  },
  getItem(key: string): string | null {
    return this.storage[key] || null;
  },
  setItem(key: string, value: string): void {
    this.storage[key] = value;
    this.length = Object.keys(this.storage).length;
  },
  removeItem(key: string): void {
    delete this.storage[key];
    this.length = Object.keys(this.storage).length;
  },
  clear(): void {
    this.storage = {};
    this.length = 0;
  },
};

describe('상품 삭제 테스트', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('상품을 삭제하면, 장바구니 목록 데이터에서 해당 상품이 삭제된다.', async () => {
    const ID = INITIAL_ITEMS[0].id;
    const { result } = renderHook(
      () => {
        const { updateCartItems } = useDeleteCartItem(ID);
        const cartItems = useRecoilValue(cartItemsAtom);

        return { cartItems, updateCartItems };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(selectedIdsAtom, []);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await waitFor(() => {
      return result.current !== undefined;
    });

    await waitFor(() => {
      result.current.updateCartItems();
    });

    expect(result.current.cartItems.every((item) => item.id !== ID)).toBeTruthy();
  });

  it('체크 박스를 선택한 상품을 삭제하면, 로컬 스토리지에서 해당 상품 아이디가 삭제된다.', async () => {
    const ID = INITIAL_ITEMS[0].id;
    const { result } = renderHook(
      () => {
        const { updateSelectedCartItemIds } = useDeleteCartItem(ID);
        const selectedIds = useRecoilValue(selectedIdsAtom);

        return { selectedIds, updateSelectedCartItemIds };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(selectedIdsAtom, [ID]);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await waitFor(() => {
      return result.current !== undefined;
    });

    await waitFor(() => {
      result.current.updateSelectedCartItemIds();
    });

    expect(result.current.selectedIds.every((id) => id !== ID)).toBeTruthy();
    const storage = localStorageMock.getItem(STORAGE_KEY.selectedItems);
    if (storage) {
      expect(JSON.parse(storage)).toEqual([]);
    }
  });
});
