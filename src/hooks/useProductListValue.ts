import { useRecoilValue } from 'recoil';
import productListState from '../recoil/productListState';

const useProductListValue = () => useRecoilValue(productListState);

export default useProductListValue;
