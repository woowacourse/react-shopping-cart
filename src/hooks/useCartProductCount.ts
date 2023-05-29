import { useRecoilValue } from 'recoil';

import { cartProductCountSelector } from '../states/cartProducts';

const useCartProductCount = () => {
  const cartProductCount = useRecoilValue(cartProductCountSelector);

  return cartProductCount;
};

export default useCartProductCount;
