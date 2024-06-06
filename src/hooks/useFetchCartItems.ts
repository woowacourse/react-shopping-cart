import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCartItems } from "../api";
import { ERROR_MESSAGES } from "../constants";
import { cartItemsState } from "../recoil/atoms/atoms";

export const useFetchCartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_CART_ITEMS, error);
      }
    };

    if (cartItems.length === 0) {
      fetchCartItems();
    }
  }, [cartItems, setCartItems]);

  return { cartItems, setCartItems };
};
