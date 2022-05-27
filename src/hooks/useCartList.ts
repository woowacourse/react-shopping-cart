import {
  CartActionType,
  fetchDeleteCartAsync,
  fetchDeleteEveryCartItemAsync,
  fetchPatchCartAsync,
} from '@/store/cart/action';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCartList = () => {
  const { loadingCartProductId, checkedCartItem, cartList } = useSelector(
    (state: any) => state.cart,
  );

  const amount = useMemo(
    () =>
      cartList.reduce(
        (prev, cart) =>
          checkedCartItem.includes(cart.id) ? prev + cart.price * cart.quantity : prev,
        0,
      ),
    [cartList, checkedCartItem],
  );

  const dispatch = useDispatch();

  const checkCartItemLoading = useCallback(
    id => loadingCartProductId === id,
    [loadingCartProductId],
  );

  const checkCartItemChecked = useCallback(id => checkedCartItem.includes(id), [checkedCartItem]);

  const checkEveryCartItemChecked = useCallback(
    () => cartList.length === checkedCartItem.length,
    [cartList, checkedCartItem],
  );

  const decreaseCartItemCount = useCallback(cart => {
    const { id, quantity } = cart;

    dispatch(fetchPatchCartAsync(id, { ...cart, quantity: quantity - 1 }) as any);
  }, []);

  const increaseCartItemCount = useCallback(cart => {
    const { id, quantity } = cart;

    dispatch(fetchPatchCartAsync(id, { ...cart, quantity: quantity + 1 }) as any);
  }, []);

  const deleteCartItem = useCallback(cart => {
    const { id } = cart;

    if (confirm('정말로 삭제하시겠습니까?')) {
      dispatch(fetchDeleteCartAsync(id) as any);
    }
  }, []);

  const deleteEveryCartItem = useCallback(() => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      dispatch(fetchDeleteEveryCartItemAsync(checkedCartItem) as any);
    }
  }, [checkedCartItem]);

  const checkCartItem = useCallback(cart => {
    const { id } = cart;

    dispatch({ type: CartActionType.CHECK_CART_ITEM, payload: { id } });
  }, []);

  const checkEveryCartItem = useCallback(() => {
    dispatch({ type: CartActionType.CHECK_EVERY_CART_ITEM });
  }, []);

  return {
    amount,
    dispatch,
    cartItemStatusUtil: {
      checkCartItemLoading,
      checkCartItemChecked,
      checkEveryCartItemChecked,
    },
    cartItemEvent: {
      decreaseCartItemCount,
      increaseCartItemCount,
      deleteCartItem,
      deleteEveryCartItem,
      checkCartItem,
      checkEveryCartItem,
    },
  };
};
