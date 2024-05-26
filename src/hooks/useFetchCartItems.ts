import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { setCartPriceAndQuantitySelector } from "../recoil/selectors";
import { cartItemsStates } from "../recoil/atoms";

const useFetchCartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsStates);

  const setCartPriceAndQuantity = useSetRecoilState(setCartPriceAndQuantitySelector);

  const removeCartItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems?.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    setCartPriceAndQuantity(cartItems);
  }, [cartItems]);

  return { cartItems, removeCartItem };
};

export default useFetchCartItems;
