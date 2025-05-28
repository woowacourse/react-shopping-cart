import { useState, useEffect } from "react";
import { CartProduct } from "../type/cart";
import { getCartProduct } from "../api/cart/getCartProduct";

const useGetCartItem = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>();

  const refetch = async () => {
    const data = await getCartProduct();
    setCartItems(data.content);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartProduct();
      setCartItems(data.content);
    };
    fetchCartItems();
  }, []);

  return { cartItems, refetch };
};

export default useGetCartItem;
