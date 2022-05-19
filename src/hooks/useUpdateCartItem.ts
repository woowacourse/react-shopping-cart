import { postCartItem, putCartItem } from 'redux/action-creators/cartListThunk';
import { useAppDispatch } from './useAppDispatch';
import { CartItem } from 'types/domain';
import { CartListAction } from 'redux/actions/cartList';
import { LOCAL_BASE_URL } from 'apis';

const useUpdateCartItem = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const updateCartItemQuantity = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    if (!targetItem) {
      dispatch(postCartItem({ id, quantity: 1, willPurchase: true }));

      return;
    }
    dispatch(putCartItem({ ...targetItem, quantity: targetItem.quantity + 1, willPurchase: true }));
  };

  const toggleCartItemWillPurchase = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);
    const prevWillPurchase = targetItem.willPurchase;

    dispatch(putCartItem({ id, quantity: targetItem.quantity, willPurchase: !prevWillPurchase }));
  };

  return { updateCartItemQuantity, toggleCartItemWillPurchase };
};

export default useUpdateCartItem;
