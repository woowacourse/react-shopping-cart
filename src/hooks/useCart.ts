import { useEffect, useState } from "react";
import { ResponseCartItem } from "../types/types";
import getCartItemList from "../api/cartItemListApi";

function useCart() {
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getCartItemList({
      page: 0,
      size: 20,
      sort: "asc",
    })
      .then((res) => {
        setCartItemList(res);
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
