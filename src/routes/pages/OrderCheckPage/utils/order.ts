import { CartItemProps } from '../../../../types/cartItem';

export function getOrderPrice(selectedCartData: CartItemProps[]) {
  return selectedCartData.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
}

export function getPaymentAmount(
  orderPrice: number,
  deliveryFee: number,
  totalDiscount: number
) {
  const amount = orderPrice + deliveryFee - totalDiscount;
  return Math.max(0, amount);
}
