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

  const addProduct = async () => {
    const updatedCartProducts = [...cartProducts, { id, quantity: 1, product }];
    setCartProducts(updatedCartProducts);
    setStoredCartProducts(updatedCartProducts);
    await postCartProduct(id);
  };

  const removeProduct = () => {
    setCartProducts((prev) => deleteProduct(prev, id));
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
