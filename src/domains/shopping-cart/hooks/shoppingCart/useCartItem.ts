import { useEffect, useState } from "react";
import { useAsync } from "../../../../api/useAsync";
import { getShoppingCart } from "../../api/shoppingCart";
import { CartItemTypes } from "../../types/cartItem";

export function useCartItems() {
  const { run, loading } = useAsync(
    getShoppingCart,
    "장바구니 데이터를 가져오는데 실패했습니다"
  );
  const [data, setData] = useState<CartItemTypes[]>([]);

  const fetchData = async () => {
    const response = await run();
    if (response && response.ok) {
      const shoppingCartItems = (await response.json()).content;
      setData(shoppingCartItems);
    }
  };

  const refetchCartItems = async () => {
    try {
      await fetchData();
    } catch (error) {
      throw new Error(`잘못된 접근입니다 : ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { cartItems: data, loading, refetchCartItems };
}
