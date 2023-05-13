import { Product } from 'types/product';
import useFetch from './useFetch';

const useProductsFetch = () => {
  const fetcher = async (): Promise<Product[]> => {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/mockProducts.json`);

    if (!response.ok) throw new Error('데이터 요청에 실패했습니다');

    return response.json();
  };

  const { data: products, isLoading, errorState } = useFetch<Product[]>(fetcher);

  return { products, isLoading, errorState };
};

export default useProductsFetch;
