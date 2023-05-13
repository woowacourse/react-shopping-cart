import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  cartProductState,
  targetCartProductState,
} from '../states/cartProductState';
import type { CartProduct, Product } from '../types/product';

const findTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.find((cartProduct) => id === cartProduct.product.id);

const deleteProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.filter((cartProduct) => cartProduct.product.id !== id);

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
      setCartProducts((prev) => deleteProduct(prev, id));
    }
  }, [id, setCartProducts, targetProduct]);

  return { targetProduct, addProduct };
};

export default useCartProducts;
