import { STORAGE_KEY } from '@constants/storage';
import { useDeleteCartItem } from '@hooks/shoppingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { act } from '@testing-library/react';
import { useRecoilValue } from 'recoil';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { INITIAL_ITEMS } from './constants/cartItems';
import { localStorageMock } from './utils/localStorageMock';
import { renderHookWithRecoilRoot } from './utils/recoilTestUtils';

const renderUseDeleteCartItem = (id: number) => {
  const { result } = renderHookWithRecoilRoot(() => {
    const hookResult = useDeleteCartItem(id);
    const cartItems = useRecoilValue(cartItemsAtom);
    const selectedIds = useRecoilValue(selectedIdsAtom);

    return { cartItems, selectedIds, ...hookResult };
  });
  return result;
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

  it('상품을 삭제하면, 장바구니 목록 데이터에서 해당 상품이 삭제된다.', () => {
    const ID = INITIAL_ITEMS[0].id;
    const result = renderUseDeleteCartItem(ID);

    act(() => {
      expect(result.current).toBeDefined();
    });

    act(() => {
      result.current.updateCartItems();
    });

    expect(result.current.cartItems.every((item) => item.id !== ID)).toBeTruthy();
  });

  it('체크 박스를 선택한 상품을 삭제하면, 로컬 스토리지에서 해당 상품 아이디가 삭제된다.', () => {
    const ID = INITIAL_ITEMS[0].id;
    const result = renderUseDeleteCartItem(ID);

    act(() => {
      expect(result.current).toBeDefined();
    });

    act(() => {
      result.current.updateSelectedCartItemIds();
    });

    expect(result.current.selectedIds.every((id) => id !== ID)).toBeTruthy();
    const storage = localStorageMock.getItem(STORAGE_KEY.selectedItems);
    if (storage) {
      expect(JSON.parse(storage)).toEqual([]);
    }
  });
});
