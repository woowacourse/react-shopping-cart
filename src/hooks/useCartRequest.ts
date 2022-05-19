import { patchCartSelected, postCartItem, putCartItem } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

import { useAppDispatch } from './useAppDispatch';

const useCartRequest = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const postCartItemQuantity =
    (id: number | string) =>
    (diff = 1) => {
      dispatch(postCartItem({ id: Number(id), quantity: diff, isSelected: true }));
    };

  const updateCartItemQuantity =
    (id: number | string) =>
    (diff = 1) => {
      const targetId = typeof id === 'number' ? id : Number(id);
      const targetItem = cartList.find(cartItem => cartItem.id === targetId);

      dispatch(putCartItem({ ...targetItem, quantity: targetItem.quantity + diff }));
    };

  const patchCartItemSelected = (id: number | string) => () => {
    dispatch(patchCartSelected(Number(id)));
  };

  return { postCartItemQuantity, updateCartItemQuantity, patchCartItemSelected };
};

export default useCartRequest;
