import { useRecoilState } from "recoil";
import {
  fetchedProductListAtom,
  fetchedShoppingListAtom,
} from "../store/fetchState";
import { useEffect } from "react";
import { fetchGetQuery } from "../api";
import { Cart, Product } from "../types/product";
import { cartIdAtom } from "../store/cartState";
import useError from "./useError";
import { ERROR_MESSAGE, FETCH } from "../abstract/constants";

const useFetchData = () => {
  const [, setFetchedProductList] = useRecoilState(fetchedProductListAtom);
  const [, setFetchedShoppingList] = useRecoilState(fetchedShoppingListAtom);
  const [, setCartId] = useRecoilState(cartIdAtom);
  const { changeErrorTrue, changeErrorFalse } = useError();

  useEffect(() => {
    changeErrorFalse();
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
      } catch (error) {
        changeErrorTrue(FETCH.GET, ERROR_MESSAGE.PRODUCT);
      }
    };
    fetchData();
  }, []); // eslint-disable-line
};

const useFetchShoppingList = () => {
  const [, setFetchedShoppingList] = useRecoilState(fetchedShoppingListAtom);
  const { changeErrorTrue, changeErrorFalse } = useError();

  useEffect(() => {
    changeErrorFalse();
    const fetchData = async () => {
      try {
        const data = await fetchGetQuery<Cart[]>("/cart-items");
        setFetchedShoppingList(data);
      } catch (error) {
        changeErrorTrue(FETCH.GET, ERROR_MESSAGE.SHOPPING_LIST);
      }
    };
    fetchData();
  }, []); // eslint-disable-line
};

export { useFetchShoppingList, useFetchData };
