import {CartProduct} from '../type/cart';

const getOrderPrice = (selectedItem: CartProduct[]) => {
  return (
    selectedItem?.reduce(
      (total: number, current: CartProduct) =>
        current.product.price * current.quantity + total,
      0
    ) ?? 0
  );
};

export const calcOrderHistory = (selectedItem: CartProduct[]) => {
  const FREE_ORDER_PRICE = 100_000;
  const ORDER_PRICE = 3_000;

  const totalAmount = selectedItem?.reduce(
    (total: number, current: CartProduct) => total + current.quantity,
    0
  );
  const orderPrice = getOrderPrice(selectedItem);
  const deliveryPrice = orderPrice >= FREE_ORDER_PRICE ? 0 : ORDER_PRICE;
  const totalPrice = orderPrice + deliveryPrice;

  return {orderPrice, deliveryPrice, totalAmount, totalPrice};
};
