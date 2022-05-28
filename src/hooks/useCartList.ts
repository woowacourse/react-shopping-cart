import {
  CartActionType,
  fetchDeleteCartAsync,
  fetchDeleteSelectedCartItemAsync,
  fetchPatchCartAsync,
} from '@/store/cart/action';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCartList = () => {
  const { loadingCartProductId, selectedCartItem, cartList } = useSelector(
    (state: any) => state.cart,
  );

  const dispatch = useDispatch();

  const amount = useMemo(
    () =>
      cartList.reduce(
        (prev, cart) =>
          selectedCartItem.includes(cart.id) ? prev + cart.price * cart.quantity : prev,
        0,
      ),
    [cartList, selectedCartItem],
  );

  const checkCartItemLoading = useCallback(
    id => loadingCartProductId === id,
    [loadingCartProductId],
  );

  const checkCartItemChecked = useCallback(id => selectedCartItem.includes(id), [selectedCartItem]);

  const checkEveryCartItemChecked = useCallback(
    () => cartList.length === selectedCartItem.length,
    [cartList, selectedCartItem],
  );

  const decreaseCartItemCount = useCallback(cart => {
    const { id, quantity } = cart;

    dispatch(fetchPatchCartAsync(id, { ...cart, quantity: quantity - 1 }) as any);
  }, []);

  const increaseCartItemCount = useCallback(cart => {
    const { id, quantity } = cart;

    dispatch(fetchPatchCartAsync(id, { ...cart, quantity: quantity + 1 }) as any);
  }, []);

  const changeCartItemCount = useCallback((cart, count) => {
    const { id } = cart;
    if (count <= 0 || count >= 100) {
      throw new Error('1이상 99이하의 숫자를 입력해주세요');
    }

    if (confirm('수량을 변경하시겠습니까?')) {
      dispatch(fetchPatchCartAsync(id, { ...cart, quantity: count }) as any);
    }
  }, []);

  const deleteCartItem = useCallback(cart => {
    const { id } = cart;

    if (confirm('정말로 삭제하시겠습니까?')) {
      dispatch(fetchDeleteCartAsync(id) as any);
    }
  }, []);

  const deleteSelectedCartItem = useCallback(() => {
    if (selectedCartItem.length === 0) {
      throw new Error('선택된 상품이 없습니다.');
    }

    if (confirm('정말로 삭제하시겠습니까?')) {
      dispatch(fetchDeleteSelectedCartItemAsync(selectedCartItem) as any);
    }
  }, [selectedCartItem]);

  const selectCartItem = useCallback(cart => {
    const { id } = cart;

    dispatch({ type: CartActionType.SELECT_CART_ITEM, payload: { id } });
  }, []);

  const selectEveryCartItem = useCallback(() => {
    dispatch({ type: CartActionType.SELECT_EVERY_CART_ITEM });
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
      changeCartItemCount,
      deleteCartItem,
      deleteSelectedCartItem,
      selectCartItem,
      selectEveryCartItem,
    },
  };
};
