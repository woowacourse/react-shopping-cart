import { useState } from "react";
import type { CartItemType } from "../types/response";
import { getCartItemById } from "../utils/getCartItemById";
import {
  deleteCartItem,
  getCart,
  modifyCartItem,
} from "../services/cartService";
import tryApiCall from "../utils/tryApiCall";
import { useToast } from "../contexts/ToastContext";

const useCartData = () => {
  const [cartData, setCartData] = useState<CartItemType[]>([]);
  const { openToast } = useToast();

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
    tryApiCall(
      async () => {
        await modifyCartItem(cartItemId, quantity);
        const cartData = await getCart();
        setCartData(cartData);
      },
      openToast,
      "장바구니 수량을 변경했습니다."
    );
  };

  const removeCartItem = async (cartItemId: number) => {
    tryApiCall(
      async () => {
        await deleteCartItem(cartItemId);
        const cartData = await getCart();
        setCartData(cartData);
      },
      openToast,
      "장바구니 상품을 삭제했습니다."
    );
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
  };
};

export default useCartData;
