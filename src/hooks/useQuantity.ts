import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { productSelector } from "recoil/selector";
import { MAX_QUANTITY, MIN_QUANTITY } from "constants/";
import { CartProduct } from "types/domain";

export const useQuantity = (itemID: number) => {
  const [cartItem, setCartItem] = useRecoilState(productSelector(itemID));
  const [quantity, setQuantity] = useState<string>(
    cartItem ? cartItem.quantity.toString() : MIN_QUANTITY.toString()
  );

  const changeQuantity = (newQuantity: string) => {
    if (Number(newQuantity) > MAX_QUANTITY || Number(newQuantity) < MIN_QUANTITY) return;

    fetch(`/cart-items/${itemID}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity: Number(newQuantity) }),
    })
      .then(() => {
        setQuantity(newQuantity);
        setCartItem({ ...cartItem, quantity: Number(newQuantity) } as CartProduct);
      })
      .catch((err) => {
        console.log(`장바구니 상품 수량 변경 실패: ${err instanceof Error ? err.message : ""}`);
      });
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
