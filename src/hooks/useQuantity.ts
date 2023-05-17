import { useRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import { ProductType } from "../types/domain";
import { cartProductsSelector } from "../recoil/selector";
import {
  KEY_LOCALSTORAGE_CART,
  MAX_LENGTH_QUANTITY,
  MAX_QUANTITY,
  MIN_QUANTITY,
} from "../constants";
import { setLocalStorage } from "../utils";

export const useQuantity = (productId: number) => {
  const products = useRecoilValue(productsState);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsSelector);

  const [quantity, setQuantity] = useState<string>(
    products.find((product: ProductType) => product.id === productId).quantity
  );

  useEffect(() => {
    setLocalStorage(KEY_LOCALSTORAGE_CART, cartProducts);
  }, [cartProducts]);

  const setNewQuantity = (newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    setQuantity(newQuantity.toString());
    setCartProducts({ id: productId, quantity: newQuantity.toString() });
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

    setCartProducts({ id: productId, quantity: e.target.value });
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
