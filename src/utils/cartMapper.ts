import { CartItemType } from '../types/response';

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

export const mapToCartItems = (cartData: CartItemType[]): CartItem[] => {
  return cartData.map((item) => ({
    id: item.id,
    price: item.product.price,
    quantity: item.quantity,
  }));
};

export const mapToCartItem = (cartData: CartItemType): CartItem => {
  return {
    id: cartData.id,
    price: cartData.product.price,
    quantity: cartData.quantity,
  };
};
