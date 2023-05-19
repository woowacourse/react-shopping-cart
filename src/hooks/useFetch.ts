import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { fetchProducts, fetchCartItems } from "../api";
import { MIN_QUANTITY } from "../constants";
import { productsState } from "../recoil/atom";
import { PayloadType, CartItemType } from "../types/domain";

export const useFetch = () => {
  const setProducts = useSetRecoilState(productsState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProductsWithQuantity();
  }, []);

  const setProductsWithQuantity = async () => {
    try {
      const products = await fetchProducts();
      const cartItems = await fetchCartItems();

      const productsWithQuantity = products.map((product: PayloadType) => {
        const cartProduct = cartItems.find(
          (cartItem: CartItemType) => cartItem.id === product.id
        );
        return {
          ...product,
          quantity: cartProduct ? cartProduct.quantity : MIN_QUANTITY,
        };
      });
      setProducts(productsWithQuantity);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoading };
};
