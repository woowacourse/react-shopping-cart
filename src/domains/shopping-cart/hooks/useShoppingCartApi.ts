import { useEffect, useState } from "react";
import { CartItemTypes } from "../types/cartItem";
import { deleteShoppingCart, getShoppingCart } from "../api/shoppingCart";

export function useShoppingCartApi() {
  const [cartItem, setCartItem] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function withErrorHandling(fn: () => Promise<void>, errorMessage: string) {
    return fn().catch(() => {
      setError(errorMessage);
      return;
    });
  }

  const getCartItemData = async () => {
    withErrorHandling(async () => {
      const response = await getShoppingCart();
      setCartItem(response);
    }, "데이터를 가져오는데 실패했습니다");
  };

  const deleteCartItem = async (id: number) => {
    withErrorHandling(() => deleteShoppingCart(id), "삭제에 실패했습니다");
  };

  useEffect(() => {
    console.log("장바구니 데이터 로딩 중...");
    getCartItemData();
    setIsLoading(false);
  }, []);

  return {
    getCartItemData,
    deleteCartItem,
    cartItem,
    error,
    isLoading,
  };
}
