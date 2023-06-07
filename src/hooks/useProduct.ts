import { ProductType } from '../types/types';
import { useQuery } from 'react-query';

const useProduct = () => {
  const {
    data: productData,
    isFetching,
    isError,
  } = useQuery<ProductType[]>('products', async () => {
    const res = await fetch('/products', {
      method: 'GET',
    });
    const resData = await res.json();
    return resData;
  });

  return {
    productData,
    isFetching,
    isError,
  };
};

export default useProduct;
