import { useRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import { ProductListType, ProductType } from "../types/domain";
import { cartProductsSelector } from "../recoil/selector";
import {
  KEY_LOCALSTORAGE_CART,
  MAX_LENGTH_QUANTITY,
  MAX_QUANTITY,
  MIN_QUANTITY,
} from "../constants";
import { setLocalStorage } from "../utils";

export const useQuantity = (productId: number) => {
  const [products, setProducts] = useRecoilState(productsState);
  const cartProducts = useRecoilValue(cartProductsSelector);

  const [quantity, setQuantity] = useState<string>(
    products.find((product) => product.id === productId)?.quantity ||
      MIN_QUANTITY.toString()
  );

  useEffect(() => {
    setLocalStorage(KEY_LOCALSTORAGE_CART, cartProducts);
  }, [cartProducts, products, setProducts]);

  const setNewQuantity = (newQuantity: number) => {
    if (newQuantity > MAX_QUANTITY || newQuantity < MIN_QUANTITY) return;

    setQuantity(newQuantity.toString());

    const newProducts: ProductListType = products.map((product: ProductType) =>
      product.id === productId
        ? { ...product, quantity: newQuantity.toString() }
        : product
    );

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
    )
      e.target.value = MIN_QUANTITY.toString();

    const newProducts: ProductListType = products.map((product: ProductType) =>
      product.id === productId
        ? { ...product, quantity: e.target.value }
        : product
    );

    setProducts(newProducts);
  };

  return {
    quantity,
    setNewQuantity,
    handleQuantityChanged,
    handleQuantityBlured,
  } as const;
};
