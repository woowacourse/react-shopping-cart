import { CartItemProps } from '../../../../types/cartItem';

export function getTotalProductQuantity(selectedCartData: CartItemProps[]) {
  return selectedCartData.reduce((acc, curr) => acc + curr.quantity, 0);
}

export function getDeliveryFee(totalPrice: number) {
  return totalPrice >= 100000 ? 0 : 3000;
}

export function getMoreThanTwoProducts(selectedCartData: CartItemProps[]) {
  return selectedCartData.filter((item) => item.quantity >= 3);
}
