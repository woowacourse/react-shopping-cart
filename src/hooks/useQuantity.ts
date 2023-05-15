import { useRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import { ProductType } from "../types/domain";
import { cartProductsSelector } from "../recoil/selector";
import {
  KEY_LOCALSTORAGE_CART,
  MAX_QUANTITY,
  MIN_QUANTITY,
} from "../constants";

export const useQuantity = (ProductId: number) => {
  const totalProducts = useRecoilValue(productsState);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsSelector);
  const [quantity, setQuantity] = useState<string>(
    totalProducts.find((Product: ProductType) => Product.id === ProductId)
      .quantity
  );

  useEffect(() => {
    localStorage.setProduct(
      KEY_LOCALSTORAGE_CART,
      JSON.stringify(cartProducts)
    );
  }, [cartProducts]);

  const setNewQuantity = (newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    setQuantity(newQuantity.toString());
    setCartProducts({ id: ProductId, quantity: newQuantity.toString() });
  };

  const handleQuantityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity === "" || Number(quantity) < MIN_QUANTITY)
      e.target.value = MIN_QUANTITY.toString();
    if (Number(quantity) > MAX_QUANTITY)
      e.target.value = MAX_QUANTITY.toString();

    setCartProducts({ id: ProductId, quantity: e.target.value });
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
