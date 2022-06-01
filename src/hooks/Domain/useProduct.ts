import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../../api";
import { Product } from "../../modules/product/type";

const useProduct = (id: number) => {
  const [productData, setProductData] = useState<Product>({
    isLoading: false,
    data: {},
    error: null,
  });

  const fetchData = useCallback(async () => {
    const { data } = await getProductById(id);
    setProductData(() => ({ isLoading: false, data, error: null }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      setProductData(() => ({
        isLoading: true,
        data: {},
        error: null,
      }));
      fetchData();
    } catch (e: any) {
      setProductData(() => ({
        isLoading: false,
        data: {},
        error: e.message,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    product: productData,
  };
};

export default useProduct;
