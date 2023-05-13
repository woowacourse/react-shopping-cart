import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  cartProductState,
  targetCartProductState,
} from '../states/cartProducts';
import { deleteTargetProduct } from '../states/cartProducts/util';
import type { Product } from '../types/product';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const setCartProducts = useSetRecoilState(cartProductState);
  const targetProduct = useRecoilValue(targetCartProductState(id));

  const addProduct = () => {
    setCartProducts((prev) => [
      ...prev,
      { id: Date.now(), quantity: 1, product },
    ]);
  };

  useEffect(() => {
    if (!targetProduct) return;

    if (targetProduct.quantity === 0) {
      setCartProducts((prev) => deleteTargetProduct(prev, id));
    }
  }, [id, setCartProducts, targetProduct]);

  return { targetProduct, addProduct };
};

export default useCartProducts;
