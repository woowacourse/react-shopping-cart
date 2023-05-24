import { useSetRecoilState } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';
import type { CartProduct } from '../types/product';
import { patchCartProduct } from '../apis/cartProducts';
import { findTargetProduct } from '../domain/cartProductHandler';
import {
  getStoredCartProducts,
  setStoredCartProducts,
} from '../utils/localStorage';

const addTargetQuantity = (cartProducts: CartProduct[], id: number) =>
  cartProducts.map((cartProduct) => {
    if (cartProduct.product.id === id) {
      return { ...cartProduct, quantity: cartProduct.quantity + 1 };
    }
    return cartProduct;
  });

const subtractTargetQuantity = (cartProducts: CartProduct[], id: number) =>
  cartProducts.map((cartProduct) => {
    if (cartProduct.product.id === id) {
      return { ...cartProduct, quantity: cartProduct.quantity - 1 };
    }
    return cartProduct;
  });

const useProductQuantity = (id: number) => {
  const setCartProducts = useSetRecoilState(cartProductAtom);

  const addCount = () => {
    setCartProducts((prev) => {
      const updatedCartProducts = addTargetQuantity(prev, id);
      const targetProduct = findTargetProduct(updatedCartProducts, id);

      if (targetProduct) {
        patchCartProduct(id, targetProduct.quantity);
        setStoredCartProducts(updatedCartProducts);
      }

      return updatedCartProducts;
    });
  };

  const subtractCount = () => {
    setCartProducts((prev) => {
      const updatedCartProducts = subtractTargetQuantity(prev, id);
      const targetProduct = findTargetProduct(updatedCartProducts, id);

      if (targetProduct) {
        patchCartProduct(id, targetProduct.quantity);
        setStoredCartProducts(updatedCartProducts);
      }

      return updatedCartProducts;
    });
  };

  return { addCount, subtractCount };
};

export default useProductQuantity;
