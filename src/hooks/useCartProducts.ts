import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import type { Product } from '../types/product';
import { cartProductAtom } from '../recoil/cartProductData';
import { deleteProduct, findTargetProduct } from '../domain/cartProductHandler';
import { deleteCartProduct, postCartProduct } from '../apis/cartProducts';
import useProductQuantity from './useProductQuantity';
import { setStoredCartProducts } from '../utils/localStorage';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const { addCount, subtractCount } = useProductQuantity(id);

  const addProduct = () => {
    const updatedCartProducts = [...cartProducts, { id, quantity: 1, product }];

    setCartProducts(updatedCartProducts);
    setStoredCartProducts(updatedCartProducts);
    postCartProduct(id);
  };

  const removeProduct = () => {
    const updatedCartProducts = deleteProduct(cartProducts, id);

    setCartProducts((prev) => deleteProduct(prev, id));
    setStoredCartProducts(updatedCartProducts);
    deleteCartProduct(id);
  };

  const target = findTargetProduct(cartProducts, id);

  useEffect(() => {
    if (!target) return;

    if (target.quantity === 0) {
      removeProduct();
    }
  }, [id, setCartProducts, target]);

  return { target, addProduct, removeProduct, addCount, subtractCount };
};

export default useCartProducts;
