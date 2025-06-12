import { useEffect, useState } from "react";
import type { CartItemType } from "../types/response";
import { getCartItemById } from "../utils/getCartItemById";
import {
  deleteCartItem,
  getCart,
  modifyCartItem,
} from "../services/cartService";
import useApiHandler from "./@common/useApiHandler";

interface UseCartDataProps {
  syncIsCheckedSet: (updateData: CartItemType["id"][]) => void;
}

const useCartData = ({ syncIsCheckedSet }: UseCartDataProps) => {
  const { callApi, loadingState } = useApiHandler();
  const [cartData, setCartData] = useState<CartItemType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      const initialCartData = await callApi<CartItemType[]>(
        () => getCart(),
        "장바구니 데이터를 불러왔습니다.",
        "initialLoading"
      );
      if (!initialCartData) {
        return;
      }
      initCartData(initialCartData);
      syncIsCheckedSet(initialCartData.map((item: CartItemType) => item.id));
    };

    fetchCartData();
  }, []);

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
    if (isProcessing) return;

    try {
      setIsProcessing(true);
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
      if (!updateCartData) return;
    } finally {
      setIsProcessing(false);
    }
  };

  const removeCartItem = async (cartItemId: number) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
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
      if (!updateCartData) return;

      syncIsCheckedSet(updateCartData.map((item: CartItemType) => item.id));
    } finally {
      setIsProcessing(false);
    }
  };

  const initCartData = (updateData: CartItemType[]) => {
    setCartData(updateData);
  };

  return {
    cartData,
    loadingState,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    initCartData,
  };
};

export default useCartData;
