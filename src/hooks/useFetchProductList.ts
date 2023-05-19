import { useRecoilState } from "recoil";
import { fetchedProductListAtom } from "../store/fetchState";
import { useLayoutEffect } from "react";
import fetchQuery from "../api";
import { Product } from "../types/product";

const useFetchProductList = () => {
  const [, setFetchedProductList] = useRecoilState(fetchedProductListAtom);

  useLayoutEffect(() => {
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

export default useFetchProductList;
