import { useRecoilState } from 'recoil';

import { cartItemsState, checkedCartItemIdsState } from '@/e_entities/cart';
import { fetchDeleteCartItem } from '@/f_shared';

export const useDeleteCartItem = (cartItemId: CartItemId) => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(checkedCartItemIdsState);

  const handleDelete = async () => {
    if (confirm('상품을 장바구니에서 삭제하시겠습니까?')) {
      await fetchDeleteCartItem(cartItemId);

      const updatedCartItems = cartItems.filter((item) => item.id !== cartItemId);
      setCartItems(updatedCartItems);

      const updatedCheckedCartItemIds = checkedCartItemIds.filter((id) => id !== cartItemId);
      setCheckedCartItemIds(updatedCheckedCartItemIds);
    }
  };

  return handleDelete;
};
