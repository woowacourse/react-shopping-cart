import { useRecoilState } from 'recoil';

import productListState from '../store/product';
import { useFetch } from './useFetch';

export const useProductListFetch = () => {
  const [, productListStateChange] = useRecoilState(productListState);
  const data = useFetch({ url: '/productlist' });
  productListStateChange(data);
};
