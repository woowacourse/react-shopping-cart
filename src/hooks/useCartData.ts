import { useState } from 'react';
import { CartItemType } from '../types/response';
import { getCartItemById } from '../utils/getCartItemById';
import {
  deleteCartItem,
  getCart,
  modifyCartItem,
} from '../services/cartService';
import tryApiCall from '../utils/tryApiCall';
import { useToast } from '../contexts/ToastContext';

const useCartData = () => {
  const [cartData, setCartData] = useState<CartItemType[]>([]);
  const { openToast } = useToast();

  const fetchCartData = async () => {
    const { error, data } = await tryApiCall(async () => {
      return await getCart();
    });

    if (error) {
      openToast(error, false);
    } else {
      if (data) {
        initCartData(data);
        openToast('장바구니 데이터를 불러왔습니다.', true);
      }
    }
  };

  const updateCartItem = async (cartId: number) => {
    const cartItem = getCartItemById(cartData, cartId);
    if (!cartItem) {
      return;
    }
    if (cartItem.quantity === 1) {
      await removeCartItem(cartItem.id);
      return;
    }
    await increaseCartItem(cartItem.id, cartItem.quantity - 1);
  };

  const increaseCartItem = async (cartItemId: number, quantity: number) => {
    const { error } = await tryApiCall(async () => {
      await modifyCartItem(cartItemId, quantity);
      await fetchCartData();
    });

    if (error) {
      openToast(error, false);
    } else {
      openToast('장바구니 수량을 변경했습니다.', true);
    }
  };

  const removeCartItem = async (cartItemId: number) => {
    const { error } = await tryApiCall(async () => {
      await deleteCartItem(cartItemId);
      await fetchCartData();
    });

    if (error) {
      openToast(error, false);
    } else {
      openToast('장바구니 상품을 삭제했습니다.', true);
    }
  };

  const initCartData = (updateData: CartItemType[]) => {
    setCartData(updateData);
  };

  return {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    initCartData,
    fetchCartData,
  };
};

export default useCartData;
