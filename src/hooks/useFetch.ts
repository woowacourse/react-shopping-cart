import { useRecoilState } from "recoil";
import {
  fetchedProductListAtom,
  fetchedShoppingListAtom,
} from "../store/fetchState";
import { useEffect, useLayoutEffect } from "react";
import { fetchGetQuery } from "../api";
import { Cart, Product } from "../types/product";
import { cartIdAtom } from "../store/cartState";

const useFetchData = (handleIsLoading: VoidFunction) => {
  const [, setFetchedProductList] = useRecoilState(fetchedProductListAtom);
  const [, setFetchedShoppingList] = useRecoilState(fetchedShoppingListAtom);
  const [, setCartId] = useRecoilState(cartIdAtom);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const shoppingData = await fetchGetQuery<Cart[]>("/cart-items");
        setFetchedShoppingList(shoppingData);
        setCartId(() =>
          shoppingData.map((data) => {
            return data.id;
          })
        );

        const productData = await fetchGetQuery<Product[]>("/products");
        setFetchedProductList(productData);
        setTimeout(() => handleIsLoading(), 2000);
      } catch (error) {
        console.log(error + "입니다");
      }
    };
    fetchData();
  }, []);
};

const useFetchShoppingList = (handleIsLoading: VoidFunction) => {
  const [, setFetchedShoppingList] = useRecoilState(fetchedShoppingListAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGetQuery<Cart[]>("/cart-items");
        setFetchedShoppingList(data);
        setTimeout(() => handleIsLoading(), 2000);
      } catch (error) {
        console.log(error + "입니다");
      }
    };
    fetchData();
  }, []);
};

export { useFetchShoppingList, useFetchData };
