import useFetch from '../useFetch.ts';
import { ProductList } from '../../types/CartList.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useGetProductList = () => {
  const [{ data }] = useFetch<ProductList>(endPoints.productList);

  return { data };
};

export default useGetProductList;
