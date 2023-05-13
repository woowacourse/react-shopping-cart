import { useSetRecoilState } from 'recoil';

import { cartProductState } from '../states/cartProducts';
import {
  addTargetQuantity,
  subtractTargetQuantity,
} from '../states/cartProducts/util';

const useProductQuantity = (id: number) => {
  const setCartProducts = useSetRecoilState(cartProductState);

  const addCount = () => {
    setCartProducts((prev) => addTargetQuantity(prev, id));
  };

  const subtractCount = () => {
    setCartProducts((prev) => subtractTargetQuantity(prev, id));
  };

  return { addCount, subtractCount };
};

export default useProductQuantity;
