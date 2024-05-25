import { cartItemSelector, cartItemsState } from "@/recoil/cartItems";
import { useRecoilState, useRecoilValue } from "recoil";

const useGetCartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const fetchCartItem = useRecoilValue(cartItemSelector);

  const getCartItems = () => {
    const result = fetchCartItem;
    setCartItems(result);
    return cartItems;
  };

  return { getCartItems };
};

export default useGetCartItems;
