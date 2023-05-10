import { useRecoilValue, useSetRecoilState } from "recoil";
import { itemsState } from "../recoil/atom";
import React, { useState } from "react";
import { ItemType } from "../types/domain";
import { itemQuantitySelector } from "../recoil/selector";
import { MAX_QUANTITY, MIN_QUANTITY } from "../constants";

export const useQuantity = (itemId: number) => {
  const setItemQuantity = useSetRecoilState(itemQuantitySelector);
  const items = useRecoilValue(itemsState);
  const [quantity, setQuantity] = useState(
    items.find((item: ItemType) => item.id === itemId).quantity
  );

  const setNewQuantity = (newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    setQuantity(newQuantity.toString());
    setItemQuantity({ id: itemId, quantity: newQuantity.toString() });
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < MIN_QUANTITY)
      e.target.value = MIN_QUANTITY.toString();
    if (Number(quantity) > MAX_QUANTITY) e.target.value = MAX_QUANTITY.toString();

    setItemQuantity({ id: itemId, quantity: e.target.value });
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
