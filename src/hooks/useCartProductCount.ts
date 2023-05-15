import { useRecoilValue } from 'recoil';

import { cartProductCountState } from '../states/cartProducts';

const useCartProductCount = () => {
  const cartProductCount = useRecoilValue(cartProductCountState);

  return cartProductCount;
};

export default useCartProductCount;
