import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtomFamily, cartIDAtom } from "../store/cartState";
import { useState } from "react";
import { Cart } from "../types/product";
import { targetProductSelector } from "../store/fetchSelectors";

const useCart = (productId: number) => {
  const [cart, setCart] = useRecoilState(cartAtomFamily(productId));
  const [cartID, setCartID] = useRecoilState(cartIDAtom);
  const product = useRecoilValue(targetProductSelector)(productId);
  const productInCart = cart.quantity ? true : false;
  const [isCartClicked, setIsCartClicked] = useState(Boolean(productInCart));

  const addToCart = () => {
    const newProduct: Cart = {
      id: productId,
      quantity: 1,
      product,
    };
    setCart(newProduct);
    setCartID([...cartID, productId]);
    setIsCartClicked(true);
  };

  const deleteToCart = () => {
    const updateProduct: Cart = {
      id: productId,
      quantity: 0,
      product,
    };
    setCart(updateProduct);
    setIsCartClicked(false);
    const newCartID = cartID.filter((id) => id !== productId);
    setCartID(newCartID);
  };

  const plusQuantity = () => {
    const updateProduct: Cart = {
      id: productId,
      quantity: cart.quantity + 1,
      product,
    };

    setCart(updateProduct);
  };

  const minusQuantity = () => {
    const updateProduct: Cart = {
      id: productId,
      quantity: cart.quantity - 1,
      product,
    };

    if (updateProduct.quantity === 0) {
      setIsCartClicked(false);
      const newCartID = cartID.filter((id) => id !== productId);
      setCartID(newCartID);
    }

    setCart(updateProduct);
  };

  return {
    cart,
    product,
    isCartClicked,
    addToCart,
    deleteToCart,
    plusQuantity,
    minusQuantity,
  };
};

export default useCart;
