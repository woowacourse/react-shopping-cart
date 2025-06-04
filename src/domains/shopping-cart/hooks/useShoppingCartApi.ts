import { useEffect, useState } from "react";
import { CartItemTypes } from "../types/cartItem";
import {
  deleteShoppingCart,
  getShoppingCart,
  patchShoppingCart,
} from "../api/shoppingCart";

export function useShoppingCartApi() {
  const [cartItems, setCartItem] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function withErrorHandling(
    fetchFunction: () => Promise<Response>,
    errorMessage: string,
    updateLoading?: boolean
  ): Promise<Response | undefined> {
    try {
      setLoading(true);
      const response = await fetchFunction();
      setLoading(false);
      if (updateLoading && response.ok) getCartItemData();
      return response;
    } catch (error) {
      setError(errorMessage);
    }
  }

  const getCartItemData = async () => {
    return await withErrorHandling(async () => {
      const response = await getShoppingCart();
      setCartItem(response);
      return response;
    }, "데이터를 가져오는데 실패했습니다");
  };

  const deleteCartItem = async (id: string) => {
    return await withErrorHandling(
      () => deleteShoppingCart(id),
      "삭제에 실패했습니다",
      true
    );
  };

  const patchCartItem = async (id: string, quantity: number) => {
    return await withErrorHandling(
      () => patchShoppingCart(id, quantity),
      "수량 변경에 실패했습니다",
      true
    );
  };

  useEffect(() => {
    getCartItemData();
  }, []);

  return {
    getCartItemData,
    deleteCartItem,
    patchCartItem,
    cartItems,
    loading,
    error,
  };
}
