import { useEffect, useState } from "react";
import { CartItemTypes } from "../types/cartItem";
import { deleteShoppingCart, getShoppingCart } from "../api/shoppingCart";

export function useShoppingCartApi() {
  const [cartItems, setCartItem] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function withErrorHandling(
    fetchFunction: () => Promise<Response>,
    errorMessage: string
  ): Promise<Response | undefined> {
    try {
      setLoading(true);
      const response = await fetchFunction();
      setLoading(false);
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
      "삭제에 실패했습니다"
    );
  };

  useEffect(() => {
    getCartItemData();
  }, []);

  return {
    getCartItemData,
    deleteCartItem,
    cartItems,
    loading,
    error,
  };
}
