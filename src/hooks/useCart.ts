import { useEffect, useState } from "react";
import { ResponseCartItem } from "../types/types";
import getCartItemList from "../api/cartItemListApi";

function useCart() {
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);

  useEffect(() => {
    getCartItemList({
      page: 0,
      size: 20,
      sort: "asc",
    }).then((res) => {
      setCartItemList(res);
    });
  }, []);

  return {
    cartItemList,
  };
}

export default useCart;
