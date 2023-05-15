import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import { ItemType } from "../types/domain";
import { cartItemsSelector } from "../recoil/selector";
import {
  KEY_LOCALSTORAGE_CART,
  MAX_QUANTITY,
  MIN_QUANTITY,
} from "../constants";

export const useQuantity = (itemId: number) => {
  const totalItems = useRecoilValue(itemsState);
  const [cartItems, setCartItems] = useRecoilState(cartItemsSelector);
  const [quantity, setQuantity] = useState<string>(
    totalItems.find((item: ItemType) => item.id === itemId).quantity
  );

  useEffect(() => {
    localStorage.setItem(KEY_LOCALSTORAGE_CART, JSON.stringify(cartItems));
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
    if (Number(quantity) > MAX_QUANTITY)
      e.target.value = MAX_QUANTITY.toString();

    setCartItems({ id: itemId, quantity: e.target.value });
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
