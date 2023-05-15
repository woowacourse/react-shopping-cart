import { useSetRecoilState } from 'recoil';
import productListState from '../recoil/productListState';

const useSetProductList = () => useSetRecoilState(productListState);

export default useSetProductList;
