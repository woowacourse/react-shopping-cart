import { useRecoilState } from "recoil";
import {
  fetchedProductListAtom,
  fetchedShoppingListAtom,
} from "../store/fetchState";
import { useEffect, useLayoutEffect } from "react";
import fetchQuery from "../api";
import { Cart, Product } from "../types/product";

const useFetchData = () => {
  const [, setFetchedProductList] = useRecoilState(fetchedProductListAtom);
  const [fetchedShoppingList, setFetchedShoppingList] = useRecoilState(
    fetchedShoppingListAtom
  );

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const ShoppingData = await fetchQuery<Cart[]>("/cart-items");
        setFetchedShoppingList(ShoppingData);
        const productData = await fetchQuery<Product[]>("/products");
        setFetchedProductList(productData);
      } catch (error) {
        console.log(error + "입니다");
      }
    };
    fetchData();
  }, []);

  console.log(fetchedShoppingList);
};

const useFetchShoppingList = () => {
  const [, setFetchedShoppingList] = useRecoilState(fetchedShoppingListAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuery<Cart[]>("/cart-items");
        setFetchedShoppingList(data);
      } catch (error) {
        console.log(error + "입니다");
      }
    };
    fetchData();
  }, []);
};

export { useFetchShoppingList, useFetchData };
