import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { cartAtomFamily, cartIdAtom } from "../store/cartState";
import { targetProductSelector } from "../store/productState";
import { fetchDeleteQuery, fetchPatchQuery, fetchPostQuery } from "../api";
import { ERROR_MESSAGE, FETCH, ZERO } from "../abstract/constants";
import { Cart } from "../types/product";
import useError from "./useError";
import useTargetShoppingSelector from "./useTargetShopping";

const useCart = (productId: number) => {
  const [cart, setCart] = useRecoilState(cartAtomFamily(productId));
  const [cartId, setCartId] = useRecoilState(cartIdAtom);
  const product = useRecoilValue(targetProductSelector)(productId);
  const shoppingProduct = useTargetShoppingSelector(productId);

  const productInCart = !!cart.quantity;
  const [isCartClicked, setIsCartClicked] = useState(Boolean(productInCart));

  const { changeErrorTrue } = useError();
  if (
    shoppingProduct &&
    cart.quantity !== shoppingProduct.quantity &&
    cart.quantity
  ) {
    const data = { quantity: cart.quantity };
    try {
      fetchPatchQuery(`/cart-items/${cart.id}`, data);
    } catch (error) {
      changeErrorTrue(FETCH.PATCH, "");
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
      changeErrorTrue(FETCH.POST, ERROR_MESSAGE.ADD_TO_CART);
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
    setCartId((prev) => prev.filter((id) => id !== productId));

    try {
      await fetchDeleteQuery(`/cart-items/${cart.id}`);
    } catch (error) {
      changeErrorTrue(FETCH.POST, ERROR_MESSAGE.DELETE_TO_CART);
    }
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
