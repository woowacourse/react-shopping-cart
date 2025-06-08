import { CartItemProps } from '../../../../types/cartItem';

export function getTotalProductQuantity(selectedCartData: CartItemProps[]) {
  return selectedCartData.reduce((acc, curr) => acc + curr.quantity, 0);
}

export function getDeliveryFee(totalPrice: number, isFarDelivery: boolean) {
  const additionalFee = isFarDelivery ? 3000 : 0;
  return totalPrice >= 100000 ? 0 + additionalFee : 3000 + additionalFee;
}

export function getMoreThanTwoProducts(selectedCartData: CartItemProps[]) {
  return selectedCartData.filter((item) => item.quantity >= 3);
}
