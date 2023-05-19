import { useEffect, useState } from 'react';
import { ProductInformation } from '@type/types';
import { API_URL_PRODUCT_LIST } from '@constants/common';
import { useFetch } from './useFetch';

const useProductList = (): {
  data: ProductInformation[] | undefined;
  isLoading: boolean;
  error: unknown | null;
} => {
  const {
    data: originData,
    isLoading,
    error,
  } = useFetch<ProductInformation[]>(API_URL_PRODUCT_LIST);
  const [data, setData] = useState<ProductInformation[]>([]);

  useEffect(() => {
    if (!originData) return;
    const productList = originData.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      };
    });

    setData(productList);
  }, [originData]);

  return { data, isLoading, error };
};

export default useProductList;
