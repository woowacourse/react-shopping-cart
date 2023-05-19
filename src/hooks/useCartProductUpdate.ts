import { useRecoilState } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';

const useCartProductUpdate = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
};

export default useCartProductUpdate;
