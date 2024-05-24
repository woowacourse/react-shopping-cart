import { useSetRecoilState } from "recoil";
import { fetchCartItems } from "../api/cartItems";
import { rawCartItemsState } from "../recoil/rawCartItems";

type CartItemRefresher = () => Promise<void>;

export const useRefreshCartItems = (): CartItemRefresher => {
  const setRawCartItems = useSetRecoilState(rawCartItemsState);

  const refreshCartItems = async () => {
    const cartItems = await fetchCartItems();
    setRawCartItems(cartItems);
  };

  return refreshCartItems;
};
