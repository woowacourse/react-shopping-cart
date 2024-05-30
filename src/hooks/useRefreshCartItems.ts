import { useSetRecoilState } from "recoil";
import { fetchCartItems } from "../api/cartItems";
import { rawCartItemsState } from "../recoil/rawCartItems";

interface UseRefreshCartItemsReturn {
  refreshCartItems: () => Promise<void>;
}

export const useRefreshCartItems = (): UseRefreshCartItemsReturn => {
  const setRawCartItems = useSetRecoilState(rawCartItemsState);

  const refreshCartItems = async () => {
    const cartItems = await fetchCartItems();
    setRawCartItems(cartItems);
  };

  return { refreshCartItems };
};
