import useFetch from '../useFetch.ts';
import { CartList } from '../../types/CartList.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useGetCartList = () => {
  const [{ data }, refetchCartList] = useFetch<CartList>(endPoints.cart);

  return { data, refetchCartList };
};

export default useGetCartList;
