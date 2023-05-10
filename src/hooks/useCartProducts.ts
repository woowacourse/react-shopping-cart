import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import useCartProductStorage from './useCartProductStorage';
import { cartProductState } from '../states/cartProductState';
import type { CartProduct, Product } from '../types/product';

const findTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.find((cartProduct) => id === cartProduct.product.id);

const deleteProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.filter((cartProduct) => cartProduct.product.id !== id);

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

const useCartProducts = (product: Product) => {
  const { id } = product;
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);
  const [storedCartProducts, setStoredCartProducts] = useCartProductStorage();

  const addCount = () => {
    setCartProducts((prev) => addTargetQuantity(prev, id));
  };

  const subtractCount = () => {
    setCartProducts((prev) => subtractTargetQuantity(prev, id));
  };

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

  useEffect(() => {
    if (cartProducts.length !== 0) {
      setStoredCartProducts(cartProducts);
    }
  }, [cartProducts, setStoredCartProducts]);

  useEffect(() => {
    if (cartProducts.length > 0) return;

    if (storedCartProducts.length !== 0) {
      setCartProducts(storedCartProducts);
    }
  }, [cartProducts.length, setCartProducts, storedCartProducts]);

  return { target, addProduct, addCount, subtractCount };
};

export default useCartProducts;
