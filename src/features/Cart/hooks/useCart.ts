import { useContext, useEffect, useRef, useState } from 'react';

import { deleteCartItem, getCartItemList, updateCartItem } from '@/features/Cart/api/cart';
import { ToastContext } from '@/shared/context/ToastProvider';
import { isError } from '@/shared/utils/isError';
import { useFetchData } from '@/shared/hooks/useFetchData';
import { CartItem } from '../types/Cart.types';

export const useCart = () => {
  const cart = useFetchData<CartItem[]>({ autoFetch: getCartItemList });
  const { showToast } = useContext(ToastContext);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (cart.data && cart.data.length > 0 && !hasInitialized.current) {
      setCheckedItems(new Set(cart.data.map((item) => item.id)));
      hasInitialized.current = true;
    }
  }, [cart.data, checkedItems.size]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleAllCheck = () => {
    setCheckedItems((prev) => {
      if (prev.size === cart.data?.length) {
        return new Set<number>();
      }

      const newSet = new Set<number>();
      cart.data?.forEach((item) => newSet.add(item.id));
      return newSet;
    });
  };

  const updateQuantity = async (cartId: number, newQuantity: number) => {
    const cartItem = cart.data?.find((item) => item.id === cartId);
    try {
      await cart.mutate(
        () => updateCartItem({ cartId: cartId, newQuantity: newQuantity }),
        getCartItemList
      );
    } catch (error) {
      if (isError(error)) {
        showToast(
          `"${cartItem?.product.name}" 상품의 최대 구매 수량은 ${cartItem?.product.quantity}개 입니다.`
        );
      }
    }
  };

  const removeCartItem = async (id: number) => {
    try {
      await cart.mutate(() => deleteCartItem(id), getCartItemList);
      setCheckedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      if (isError(error)) {
        showToast(
          `장바구니에서 ${
            cart?.data?.find((item) => item.id === id)?.product?.name
          } 상품을 삭제할 수 없습니다.`
        );
      }
    }
  };

  const cartItems = cart.data?.map((item) => ({
    ...item,
    isChecked: checkedItems.has(item.id),
  }));

  return { cartItems, toggleCheck, toggleAllCheck, updateQuantity, removeCartItem };
};
