import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { rawCartItemsState } from "../recoil/cart/rawCartItems";
import { fetchCartItems } from "../api/cartItems";

export const useFetchCartItems = () => {
  const setRawCartItems = useSetRecoilState(rawCartItemsState);

  useEffect(() => {
    (async () => {
      const rawCartItems = await fetchCartItems();
      setRawCartItems(rawCartItems);
    })();
  }, []);
};
