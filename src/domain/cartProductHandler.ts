import type { CartProduct } from '../types/product';

export const findTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.find((cartProduct) => id === cartProduct.product.id);

export const deleteProduct = (
  cartProducts: CartProduct[],
  id: number
): CartProduct[] =>
  cartProducts.filter((cartProduct) => cartProduct.product.id !== id);
