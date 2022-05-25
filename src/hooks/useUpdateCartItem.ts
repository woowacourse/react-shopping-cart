import {
  postCartItem,
  putCartItem,
  removeCartItem as deleteCartItem,
} from 'redux/action-creators/cartListThunk';
import { useAppDispatch } from './useAppDispatch';
import { CartItem } from 'types/domain';
import { CartListAction } from 'redux/actions/cartList';

const useUpdateCartItem = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const updateCartItemQuantity = (id: number, type = 'Increase', updateQuantity = 1) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    if (type === 'Increase') {
      if (!targetItem) {
        dispatch(postCartItem({ id, quantity: 1, willPurchase: true }));

        return;
      }
      dispatch(
        putCartItem({
          ...targetItem,
          quantity: targetItem.quantity + updateQuantity,
          willPurchase: true,
        })
      );

      return;
    }
    if (type === 'Decrease') {
      if (targetItem.quantity - updateQuantity > 0) {
        dispatch(
          putCartItem({
            ...targetItem,
            quantity: targetItem.quantity - updateQuantity,
            willPurchase: true,
          })
        );
      }
      if (targetItem.quantity - updateQuantity <= 0) {
        dispatch(deleteCartItem(targetItem));
      }
    }
  };

  const removeCartItem = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    dispatch(deleteCartItem(targetItem));
  };

  const toggleCartItemWillPurchase = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);
    const prevWillPurchase = targetItem.willPurchase;

    dispatch(putCartItem({ id, quantity: targetItem.quantity, willPurchase: !prevWillPurchase }));
  };

  return { updateCartItemQuantity, toggleCartItemWillPurchase, removeCartItem };
};

export default useUpdateCartItem;
