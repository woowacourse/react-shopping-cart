import { useEffect, useState } from 'react';
import { ProductInformation } from '@type/types';
import { fetchAPI } from '@utils/common';

const useProductList = (): {
  data: ProductInformation[] | undefined;
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductInformation[]>();

  useEffect(() => {
    const fetchData = async () => {
      const apiProduct = await fetchAPI<ProductInformation[]>('api/products');

      const productList = apiProduct.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        };
      });

      setData(productList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  }, [data]);

  return { data, isLoading };
};

export default useProductList;
