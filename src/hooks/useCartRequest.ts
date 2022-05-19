import {
  deleteAllCartItemRequest,
  deleteCartItemRequest,
  patchAllCartSelectedRequest,
  patchCartSelectedRequest,
  postCartItemRequest,
  putCartItemRequest,
} from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

import { useAppDispatch } from './useAppDispatch';

const useCartRequest = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const postCartItemQuantity =
    (id: number | string) =>
    (diff = 1) => {
      dispatch(postCartItemRequest({ id: Number(id), quantity: diff, isSelected: true }));
    };

  const updateCartItemQuantity =
    (id: number | string) =>
    (diff = 1) => {
      const targetId = typeof id === 'number' ? id : Number(id);
      const targetItem = cartList.find(cartItem => cartItem.id === targetId);

      dispatch(putCartItemRequest({ ...targetItem, quantity: targetItem.quantity + diff }));
    };

  const selectCartItem = (id: number | string) => () => {
    dispatch(patchCartSelectedRequest(Number(id)));
  };

  const selectAllCartItem = (isAllSelected: boolean) => {
    dispatch(patchAllCartSelectedRequest(isAllSelected));
  };

  const deleteCartItem = (id: number | string) => () => {
    dispatch(deleteCartItemRequest(Number(id)));
  };

  const deleteAllCartItem = () => {
    dispatch(deleteAllCartItemRequest());
  };

  return {
    postCartItemQuantity,
    updateCartItemQuantity,
    selectCartItem,
    selectAllCartItem,
    deleteCartItem,
    deleteAllCartItem,
  };
};

export default useCartRequest;
