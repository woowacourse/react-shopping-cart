import useFetch from '../useFetch.ts';
import { CartList } from '../../types/CartList.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useGetCartList = () => {
  const [{ data }] = useFetch<CartList>(endPoints.cart);

  return { data };
};

export default useGetCartList;
