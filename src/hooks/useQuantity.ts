import { useRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import { MAX_LENGTH_QUANTITY, MAX_QUANTITY, MIN_QUANTITY } from "../constants";
import { changeQuantity } from "../api";
import { ProductType } from "../types/domain";

export const useQuantity = (productId: number) => {
  const [products, setProducts] = useRecoilState(productsState);
  const target = products.find(
    (product: ProductType) => product.id === productId
  );
  const [quantity, setQuantity] = useState<string | undefined>(
    target?.quantity.toString()
  );

  const setNewQuantity = (newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    setQuantity(newQuantity.toString());
    changeQuantity(productId, Number(newQuantity));
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH_QUANTITY) return;

    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === "" ||
      e.target.value === "-0" ||
      Number(quantity) < MIN_QUANTITY
    )
      e.target.value = MIN_QUANTITY.toString();

    changeQuantity(productId, Number(quantity));
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
