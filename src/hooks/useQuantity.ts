import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { cartSelector } from "recoil/cart";
import { MAX_QUANTITY, MIN_QUANTITY } from "constants/cartProduct";
import { CartProduct } from "types/domain";
import { changeItemQuantity, removeCartItem } from "api/cartItems";

export const useQuantity = (itemID: number) => {
  const [cartItem, setCartItem] = useRecoilState(cartSelector(itemID));
  const [quantity, setQuantity] = useState<string>(
    cartItem ? cartItem.quantity.toString() : MIN_QUANTITY.toString()
  );

  const changeQuantity = async (newQuantity: string) => {
    if (Number(newQuantity) > MAX_QUANTITY || Number(newQuantity) < MIN_QUANTITY) return;

    const result =
      Number(newQuantity) >= MIN_QUANTITY
        ? await changeItemQuantity(itemID, Number(newQuantity))
        : await removeCartItem(itemID);

    if (!result) {
      alert(`장바구니 상품 수량 변경 실패!`);
      return;
    }

    setQuantity(newQuantity);
    setCartItem({ ...cartItem, quantity: Number(newQuantity) } as CartProduct);
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < MIN_QUANTITY)
      e.target.value = MIN_QUANTITY.toString();
    if (Number(quantity) > MAX_QUANTITY) e.target.value = MAX_QUANTITY.toString();

    changeQuantity(e.target.value);
  };

  return {
    quantity,
    changeQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
