import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtomFamily, cartIdAtom } from "../store/cartState";
import { useState } from "react";
import { Cart } from "../types/product";
import {
  targetProductSelector,
  targetShoppingSelector,
} from "../store/fetchState";
import { fetchDeleteQuery, fetchPatchQuery, fetchPostQuery } from "../api";
import { ERROR_MESSAGE, FETCH, ZERO } from "../abstract/constants";
import useError from "./useError";

const useCart = (productId: number) => {
  const [cart, setCart] = useRecoilState(cartAtomFamily(productId));
  const [cartId, setCartId] = useRecoilState(cartIdAtom);
  const product = useRecoilValue(targetProductSelector)(productId);
  const shoppingProduct = useRecoilValue(targetShoppingSelector)(productId);

  const productInCart = cart.quantity ? true : false;
  const [isCartClicked, setIsCartClicked] = useState(Boolean(productInCart));

  const { ChangeErrorTrue } = useError();

  if (shoppingProduct && cart.quantity !== shoppingProduct.quantity) {
    console.log(cart.quantity);
    console.log(shoppingProduct.quantity);
    const data = { quantity: cart.quantity };
    try {
      fetchPatchQuery(`/cart-items/${cart.id}`, data);
    } catch (error) {
      ChangeErrorTrue(FETCH.PATCH, "");
    }
  }

  if (shoppingProduct && cart.quantity === ZERO) setCart(shoppingProduct);

  const addToCart = async () => {
    const newProduct: Cart = {
      id: productId,
      quantity: 1,
      product,
    };

    try {
      const data = { productId: productId };
      await fetchPostQuery(`/cart-items`, data);
    } catch (error) {
      ChangeErrorTrue(FETCH.POST, ERROR_MESSAGE.ADD_TO_CART);
    }
    setCart(newProduct);
    setCartId([...cartId, productId]);
    setIsCartClicked(true);
  };

  const deleteToCart = async () => {
    const updateProduct: Cart = {
      id: productId,
      quantity: ZERO,
      product,
    };
    setCart(updateProduct);
    setIsCartClicked(false);
    const newCartID = cartId.filter((id) => id !== productId);
    setCartId(newCartID);

    try {
      await fetchDeleteQuery(`/cart-items/${cart.id}`);
    } catch (error) {
      ChangeErrorTrue(FETCH.POST, ERROR_MESSAGE.DELETE_TO_CART);
    }
  };

  const plusQuantity = async () => {
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

    setCart(updateProduct);

    if (updateProduct.quantity === ZERO) {
      deleteToCart();
    }
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
