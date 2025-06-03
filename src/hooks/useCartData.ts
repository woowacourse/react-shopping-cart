import { useState } from "react";
import type { CartItemType } from "../types/response";
import { getCartItemById } from "../utils/getCartItemById";
import {
  deleteCartItem,
  getCart,
  modifyCartItem,
} from "../services/cartService";
import type { LoadingType } from "../types/loading";

interface UseCartDataProps {
  callApi: <T>(
    apiFn: () => Promise<T>,
    successMessage: string,
    loadingType: LoadingType
  ) => Promise<T | undefined>;
  syncIsCheckedSet: (updateData: CartItemType["id"][]) => void;
}

const useCartData = ({ callApi, syncIsCheckedSet }: UseCartDataProps) => {
  const [cartData, setCartData] = useState<CartItemType[]>([]);

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
    const updateCartData = await callApi<CartItemType[]>(
      async () => {
        await modifyCartItem(cartItemId, quantity);
        const cartData = await getCart();
        setCartData(cartData);
        return cartData;
      },
      "장바구니 수량을 변경했습니다.",
      "updating"
    );
    if (!updateCartData) {
      return;
    }
  };

  const removeCartItem = async (cartItemId: number) => {
    const updateCartData = await callApi<CartItemType[]>(
      async () => {
        await deleteCartItem(cartItemId);
        const cartData = await getCart();
        setCartData(cartData);
        return cartData;
      },
      "장바구니 상품을 삭제했습니다.",
      "updating"
    );
    if (!updateCartData) {
      return;
    }
    syncIsCheckedSet(updateCartData.map((item: CartItemType) => item.id));
  };

  const updateCartData = (updateData: CartItemType[]) => {
    setCartData(updateData);
  };

  return {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    updateCartData,
  };
};

export default useCartData;
