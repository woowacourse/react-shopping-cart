import { useRecoilState, useRecoilValue } from "recoil";
import { initialProductsState, productsState } from "../recoil/atom";
import React, { useState } from "react";
import { MAX_LENGTH_QUANTITY, MAX_QUANTITY, MIN_QUANTITY } from "../constants";
import { changeQuantity, deleteCartItem } from "../api";
import { ProductType } from "../types/domain";
import { getNewProducts } from "../utils/domain";

export const useQuantity = (productId: number) => {
  const initialProducts = useRecoilValue(initialProductsState);
  const [products, setProducts] = useRecoilState(productsState);
  const target = products.find(
    (product: ProductType) => product.id === productId
  );
  const [quantity, setQuantity] = useState<string | undefined>(
    target?.quantity.toString()
  );

  const setNewQuantity = async (newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    newQuantity === 0
      ? await deleteCartItem(productId)
      : await changeQuantity(productId, Number(newQuantity));

    setQuantity(newQuantity.toString());
    const newProducts = await getNewProducts(initialProducts);
    setProducts(newProducts);
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
    ) {
      e.target.value = MIN_QUANTITY.toString();
      console.log("^^ ", Number(e.target.value));
    }
    setNewQuantity(Number(e.target.value));
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
