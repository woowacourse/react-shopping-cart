import { useEffect, useState } from "react";
import { CartItemTypes } from "../types/cartItem";
import { getShoppingCart } from "../api/shoppingCart";

export function useShoppingCartApi() {
  const [cartItem, setCartItem] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getCartItemData = async () => {
    try {
      // setIsLoading(true);
      const response = await getShoppingCart();
      setCartItem(response);
    } catch (e) {
      setError("데이터를 가져오는데 실패했습니다");
    }
  };

  useEffect(() => {
    console.log("장바구니 데이터 로딩 중...");
    getCartItemData();
    setIsLoading(false);
  }, []);

  return { getCartItemData, setError, cartItem, error, isLoading };
}
