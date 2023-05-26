import { useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  deleteTargetProduct,
  updateTargetQuantity,
} from '../states/cartProducts/util';

const useProductQuantity = (id: number, quantity: number) => {
  const setCartProducts = useSetRecoilState(cartProductState);

  const addCount = () => {
    const updatedQuantity = quantity + 1;

    setCartProducts((prev) => updateTargetQuantity(prev, id, updatedQuantity));
    cartProductApis.patch(id, updatedQuantity);
  };

  const subtractCount = () => {
    const updatedQuantity = quantity - 1;

    if (updatedQuantity === 0) {
      deleteProduct();
      return;
    }

    setCartProducts((prev) => updateTargetQuantity(prev, id, updatedQuantity));
    cartProductApis.patch(id, updatedQuantity);
  };

  const deleteProduct = () => {
    setCartProducts((prev) => deleteTargetProduct(prev, id));
    cartProductApis.delete(id);
  };

  return { addCount, subtractCount, deleteProduct };
};

export default useProductQuantity;
