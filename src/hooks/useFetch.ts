import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { initialProductsState, productsState } from "../recoil/atom";
import { getNewProducts } from "../utils/domain";

export const useFetch = () => {
  const products = useRecoilValue(initialProductsState);
  const setProducts = useSetRecoilState(productsState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProductsWithQuantity();
  }, []);

  const setProductsWithQuantity = async () => {
    try {
      await fetchNewProducts();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNewProducts = async () => {
    const newProducts = await getNewProducts(products);
    setProducts(newProducts);
  };

  return { isLoading, fetchNewProducts };
};
