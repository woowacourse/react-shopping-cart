import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "../recoil/atom";
import { cartListSelector } from "../recoil/selector";
import { CART_LIST_LOCAL_STORAGE_KEY, MAX_QUANTITY, MIN_QUANTITY } from "../constants";

export const useQuantity = (itemID: number) => {
  const [cartList, setCartList] = useRecoilState(cartListSelector);
  const productList = useRecoilValue(productListState);
  const [quantity, setQuantity] = useState<string>(
    productList.find((item) => item.id === itemID)?.quantity || MIN_QUANTITY.toString()
  );

  useEffect(() => {
    localStorage.setItem(CART_LIST_LOCAL_STORAGE_KEY, JSON.stringify(cartList));
  }, [cartList]);

  const setNewQuantity = (newQuantity: string) => {
    if (Number(newQuantity) > MAX_QUANTITY || Number(newQuantity) < MIN_QUANTITY) return;

    setQuantity(newQuantity.toString());

    const newProduct = productList.find((product) => product.id === itemID);
    if (newProduct) setCartList([{ ...newProduct, quantity: newQuantity.toString() }]);
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < MIN_QUANTITY)
      e.target.value = MIN_QUANTITY.toString();
    if (Number(quantity) > MAX_QUANTITY) e.target.value = MAX_QUANTITY.toString();

    setNewQuantity(e.target.value);
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
