import type { CartProduct } from '../../types/product';

export const findTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.find((cartProduct) => id === cartProduct.product.id);

export const deleteTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.filter((cartProduct) => cartProduct.product.id !== id);

export const updateTargetQuantity = (
  cartProducts: CartProduct[],
  id: number,
  quantity: number
) =>
  cartProducts.map((cartProduct) => {
    if (cartProduct.product.id === id) {
      return { ...cartProduct, quantity };
    }
    return cartProduct;
  });
