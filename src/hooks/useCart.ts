import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtomFamily, cartIdAtom } from "../store/cartState";
import { useState } from "react";
import { Cart } from "../types/product";
import {
  targetProductSelector,
  targetShoppingSelector,
} from "../store/fetchState";
import { fetchDeleteQuery, fetchPatchQuery, fetchPostQuery } from "../api";

const useCart = (productId: number) => {
  const [cart, setCart] = useRecoilState(cartAtomFamily(productId));
  const [cartId, setCartId] = useRecoilState(cartIdAtom);
  const product = useRecoilValue(targetProductSelector)(productId);
  const shoppingProduct = useRecoilValue(targetShoppingSelector)(productId);

  const productInCart = cart.quantity ? true : false;
  const [isCartClicked, setIsCartClicked] = useState(Boolean(productInCart));

  if (cart.quantity !== 0) {
    const data = { quantity: cart.quantity };
    fetchPatchQuery(`/cart-items/${cart.id}`, data);
  }

  if (shoppingProduct && cart.quantity === 0) setCart(shoppingProduct);

  const addToCart = async () => {
    const newProduct: Cart = {
      id: productId,
      quantity: 1,
      product,
    };

    const data = { productId: productId };
    await fetchPostQuery(`/cart-items`, data);

    setCart(newProduct);
    setCartId([...cartId, productId]);
    setIsCartClicked(true);
  };

  const deleteToCart = async () => {
    const updateProduct: Cart = {
      id: productId,
      quantity: 0,
      product,
    };
    setCart(updateProduct);
    setIsCartClicked(false);
    const newCartID = cartId.filter((id) => id !== productId);
    setCartId(newCartID);

    await fetchDeleteQuery(`/cart-items/${cart.id}`);
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

    if (updateProduct.quantity === 0) {
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
