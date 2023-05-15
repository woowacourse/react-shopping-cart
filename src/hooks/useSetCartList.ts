import { useSetRecoilState } from 'recoil';
import cartListState from '../recoil/cartListState';

const useSetCartList = () => useSetRecoilState(cartListState);

export default useSetCartList;
