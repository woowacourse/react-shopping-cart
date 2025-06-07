import { CartProduct } from '../types/cart';
import { FREE_SHIPPING_FEE, SHIPPING_FEE, SHIPPING_FEE_THRESHOLD } from '../constants/cartConfig';

export const filterCheckedItems = (items: CartProduct[], checkedIds: number[]): CartProduct[] => {
  return items.filter((item) => checkedIds.includes(item.id));
};

export const calculateTotalPrice = (items: CartProduct[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const calculateTotalQuantity = (items: CartProduct[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const calculateShippingFee = (price: number, hasItems: boolean): number => {
  const needsShippingFee = price < SHIPPING_FEE_THRESHOLD;
  return hasItems && needsShippingFee ? SHIPPING_FEE : FREE_SHIPPING_FEE;
};

export const getCartDescription = (itemCount: number): string | undefined => {
  if (itemCount > 0) {
    return `현재 ${itemCount}종류의 상품이 담겨있습니다.`;
  }

  return undefined;
};
