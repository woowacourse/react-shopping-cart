import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getCartItems, setCartPriceAndQuantitySelector } from "../recoil/selectors";

const useFetchCartItems = () => {
  const fetchedCartItems = useRecoilValue(getCartItems);
  const [cartItems, setCartItems] = useState(fetchedCartItems);

  const setCartPrice = useSetRecoilState(setCartPriceAndQuantitySelector);

  useEffect(() => {
    setCartPrice(fetchedCartItems);
  }, [fetchedCartItems, setCartPrice]);

  const removeCartItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems?.filter((item) => item.id !== itemId));
  };

  return { cartItems, removeCartItem };
};

export default useFetchCartItems;
