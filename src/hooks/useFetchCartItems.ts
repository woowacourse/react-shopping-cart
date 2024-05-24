import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getCartItems, setCartPriceAndQuantitySelector } from "../recoil/selectors";
import { cartItemsStates } from "../recoil/atoms";

const useFetchCartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsStates);
  const fetchedCartItems = useRecoilValue(getCartItems);

  const setCartPrice = useSetRecoilState(setCartPriceAndQuantitySelector);

  useEffect(() => {
    if (cartItems.length) return;
    setCartItems(fetchedCartItems);
    setCartPrice(fetchedCartItems);
  }, [cartItems, fetchedCartItems, setCartPrice, setCartItems]);

  const removeCartItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems?.filter((item) => item.id !== itemId));
  };

  return { cartItems, removeCartItem };
};

export default useFetchCartItems;
