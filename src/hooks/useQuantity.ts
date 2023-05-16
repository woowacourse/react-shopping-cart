import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import { Product } from "../types/domain";
import { cartItemSelector } from "../recoil/selector";
import { MAX_QUANTITY, MIN_QUANTITY } from "../constants";

export const useQuantity = (itemId: number) => {
  const [cartItems, setCartItems] = useRecoilState(cartItemSelector);
  const productList = useRecoilValue(productListState);
  const [quantity, setQuantity] = useState<string>(
    productList.find((item: Product) => item.id === itemId).quantity
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const setNewQuantity = (newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    setQuantity(newQuantity.toString());
    setCartItems({ id: itemId, quantity: newQuantity.toString() });
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < MIN_QUANTITY)
      e.target.value = MIN_QUANTITY.toString();
    if (Number(quantity) > MAX_QUANTITY) e.target.value = MAX_QUANTITY.toString();

    setCartItems({ id: itemId, quantity: e.target.value });
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
