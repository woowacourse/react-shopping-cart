import { useRecoilValue } from 'recoil';

import { cartProductCountState } from '../states/cartProductState';

const useCartProductCount = () => {
  const cartProductCount = useRecoilValue(cartProductCountState);

  return cartProductCount;
};

export default useCartProductCount;
