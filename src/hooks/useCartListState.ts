import { useRecoilState } from 'recoil';

import cartListState from '../recoil/cartListState';

const useCartListState = () => useRecoilState(cartListState);

export default useCartListState;
