import { postCartItem, putCartItem } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

import { useAppDispatch } from './useAppDispatch';

const useUpdateCartItem = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const updateCartItemQuantity = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    if (!targetItem) {
      dispatch(postCartItem({ id, quantity: 1 }));

      return;
    }
    dispatch(putCartItem({ ...targetItem, quantity: targetItem.quantity + 1 }));
  };

  return { updateCartItemQuantity };
};

export default useUpdateCartItem;
