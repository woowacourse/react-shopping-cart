import { CartItemType } from '../types/response';
import { getCartItemById } from './getCartItemById';

export const getCartItemNamePrice = (
  isCheckedArray: number[],
  cartData: CartItemType[]
): { name: string; price: number; quantity: number }[] => {
  const results = isCheckedArray
    .map((id) => {
      const cartItem = getCartItemById(cartData, id);
      if (!cartItem || cartItem === undefined) {
        return;
      }
      return {
        name: cartItem.product.name,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      };
    })
    .filter(
      (item): item is { name: string; price: number; quantity: number } =>
        item !== undefined
    );
  return results;
};

export const calculateTotalCartItemPrice = (
  cartItemNamePrice: { name: string; price: number; quantity: number }[]
) => {
  return cartItemNamePrice.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
};

export const calculateTotalPrice = (
  cartItemNamePrice: { name: string; price: number; quantity: number }[]
) => {
  const deliveryFee = calculateDeliveryFee(cartItemNamePrice);
  return calculateTotalCartItemPrice(cartItemNamePrice) + deliveryFee;
};

export const calculateDeliveryFee = (
  cartItemNamePrice: { name: string; price: number; quantity: number }[]
) => {
  return calculateTotalCartItemPrice(cartItemNamePrice) > 100000 ? 0 : 3000;
};

export const calculateTotalProductCount = (
  cartData: CartItemType[],
  isCheckedArray: number[]
) => {
  const cartItems = isCheckedArray.map((id) => getCartItemById(cartData, id));

  return cartItems.reduce((acc, curr) => acc + (curr?.quantity ?? 0), 0);
};
