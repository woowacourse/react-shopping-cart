import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../api";
import { Product } from "../modules/product/type";
import { product } from "../types/product";

const useProduct = (id: number) => {
  const [productData, setProductData] = useState({} as Product);

  const fetchData = useCallback(async () => {
    const data = (await getProductById(id)) as product;
    setProductData(() => ({ isLoading: false, data, error: null }));
  }, [id]);

  useEffect(() => {
    try {
      setProductData(() => ({
        isLoading: true,
        data: {} as product,
        error: null,
      }));
      fetchData();
    } catch (e: any) {
      setProductData(() => ({
        isLoading: false,
        data: {} as product,
        error: e.message,
      }));
    }
  }, [fetchData, id]);

  return {
    product: productData,
  };
};

export default useProduct;
