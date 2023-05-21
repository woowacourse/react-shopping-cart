import { useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { cartProductState } from '../states/cartProducts';
import { updateTargetQuantity } from '../states/cartProducts/util';

const useProductQuantity = (id: number, quantity: number) => {
  const setCartProducts = useSetRecoilState(cartProductState);

  const addCount = () => {
    setCartProducts((prev) => updateTargetQuantity(prev, id, quantity + 1));
    cartProductApis.patch(id, quantity + 1);
  };

  const subtractCount = () => {
    setCartProducts((prev) => updateTargetQuantity(prev, id, quantity - 1));
    cartProductApis.patch(id, quantity - 1);
  };

  return { addCount, subtractCount };
};

export default useProductQuantity;
