import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { cartProductAtom } from '../data/cartProductData';
import type { CartProduct, Product } from '../types/product';

const findTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.find((cartProduct) => id === cartProduct.product.id);

const deleteProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.filter((cartProduct) => cartProduct.product.id !== id);

const useCartProducts = (product: Product) => {
  const { id } = product;
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);

  const addProduct = () => {
    setCartProducts((prev) => [
      ...prev,
      { id: Date.now(), quantity: 1, product },
    ]);
  };

  const target = findTargetProduct(cartProducts, id);

  useEffect(() => {
    if (!target) return;

    if (target.quantity === 0) {
      setCartProducts((prev) => deleteProduct(prev, id));
    }
  }, [id, setCartProducts, target]);

  return { target, addProduct };
};

export default useCartProducts;
