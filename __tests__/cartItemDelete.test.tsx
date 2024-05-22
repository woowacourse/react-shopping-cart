import { STORAGE_KEY } from '@constants/storage';
import { useDeleteCartItem } from '@hooks/shoppingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { act } from 'react';
import { useRecoilValue } from 'recoil';

import { INITIAL_ITEMS } from './constants/cartItems';
import executeCartItemRenderHook from './utils/executeRenderHook';

describe('상품 삭제 테스트', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('상품을 삭제하면, 장바구니 목록 데이터에서 해당 상품이 삭제된다.', () => {
    // given
    const ID = INITIAL_ITEMS[0].id;

    // when
    const { result } = executeCartItemRenderHook(() => {
      const { updateCartItems } = useDeleteCartItem(ID);
      const cartItems = useRecoilValue(cartItemsAtom);

      return { cartItems, updateCartItems };
    });

    act(() => {
      result.current.updateCartItems();
    });

    // then
    expect(result.current.cartItems.every((item) => item.id !== ID)).toBeTruthy();
  });

  it('체크 박스를 선택한 상품을 삭제하면, 로컬 스토리지에서 해당 상품 아이디가 삭제된다.', () => {
    // given
    const ID = INITIAL_ITEMS[0].id;

    // when
    const { result } = executeCartItemRenderHook(
      () => {
        const { updateSelectedCartItemIds } = useDeleteCartItem(ID);
        const selectedIds = useRecoilValue(selectedIdsAtom);

        return { selectedIds, updateSelectedCartItemIds };
      },
      INITIAL_ITEMS,
      new Set([ID]),
    );

    act(() => {
      result.current.updateSelectedCartItemIds();
    });

    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY.selectedItems) ?? '[]');

    // then
    expect(result.current.selectedIds.has(ID)).toBeFalsy();

    expect(storage).toStrictEqual([]);
  });
});
