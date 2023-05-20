import { useSetRecoilState } from 'recoil';

import { cartProductState } from '../states/cartProducts';
import { updateTargetQuantity } from '../states/cartProducts/util';
import { patchCartProduct } from '../apis/cartProducts';

const useProductQuantity = (id: number, quantity: number) => {
  const setCartProducts = useSetRecoilState(cartProductState);

  const addCount = () => {
    setCartProducts((prev) => updateTargetQuantity(prev, id, quantity + 1));
    patchCartProduct(id, quantity + 1);
  };

  const subtractCount = () => {
    setCartProducts((prev) => updateTargetQuantity(prev, id, quantity - 1));
    patchCartProduct(id, quantity - 1);
  };

  return { addCount, subtractCount };
};

export default useProductQuantity;
