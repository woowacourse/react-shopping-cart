import { useRecoilState } from "recoil";
import {
  fetchedProductListAtom,
  fetchedShoppingListAtom,
} from "../store/fetchState";
import { useEffect } from "react";
import fetchQuery from "../api";
import { Cart, Product } from "../types/product";

const useFetchProductList = () => {
  const [, setFetchedProductList] = useRecoilState(fetchedProductListAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuery<Product[]>("/products");
        setFetchedProductList(data);
      } catch (error) {
        console.log(error + "입니다");
      }
    };
    fetchData();
  }, []);
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
export { useFetchProductList, useFetchShoppingList };
