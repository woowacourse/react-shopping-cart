import { useState, useEffect } from "react";
import { CartProduct } from "../type/cart";
import { getCartProduct } from "../api/cart/getCartProduct";
import { useShowError } from "../provider/errorProvider";

const useGetCartItem = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>();
  const showError = useShowError();

  const getProducts = async () => {
    try {
      const data = await getCartProduct();
      setCartItems(data.content);
    } catch (e) {
      showError?.("데이터를 불러오는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { cartItems, refetch: getProducts };
};

export default useGetCartItem;
