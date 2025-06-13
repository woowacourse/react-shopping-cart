import { useEffect, useState } from "react";
import { ResponseCartItem } from "../types/types";
import getCartList from "../api/getCartList";

function useCart() {
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getCartList({
      page: 0,
      size: 20,
      sort: "asc",
    })
      .then((res) => {
        setCartItemList(res.content);
      })
      .catch((error) => {
        console.error("Cart item list fetch error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    cartItemList,
    isLoading,
  };
}

export default useCart;
