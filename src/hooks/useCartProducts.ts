import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import {
  cartProductState,
  targetCartProductState,
} from '../states/cartProducts';
import {
  addTargetProduct,
  deleteTargetProduct,
} from '../states/cartProducts/util';
import type { Product } from '../types/product';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const setCartProducts = useSetRecoilState(cartProductState);
  const targetProduct = useRecoilValue(targetCartProductState(id));

  const addProduct = () => {
    setCartProducts((prev) => addTargetProduct(prev, product));
    cartProductApis.post(id);
  };

  const deleteProduct = useCallback(() => {
    setCartProducts((prev) => deleteTargetProduct(prev, id));
    cartProductApis.delete(id);
  }, [id, setCartProducts]);

  useEffect(() => {
    if (!targetProduct) return;

    if (targetProduct.quantity === 0) {
      deleteProduct();
    }
  }, [deleteProduct, targetProduct]);

  return { targetProduct, addProduct, deleteProduct };
};

export default useCartProducts;
