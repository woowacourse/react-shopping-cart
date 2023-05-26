import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import {
  cartProductState,
  targetCartProductState,
} from '../states/cartProducts';
import { addTargetProduct } from '../states/cartProducts/util';
import type { Product } from '../types/product';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const setCartProducts = useSetRecoilState(cartProductState);
  const targetProduct = useRecoilValue(targetCartProductState(id));

  const addProduct = () => {
    setCartProducts((prev) => addTargetProduct(prev, product));
    cartProductApis.post(id);
  };

  return { targetProduct, addProduct };
};

export default useCartProducts;
