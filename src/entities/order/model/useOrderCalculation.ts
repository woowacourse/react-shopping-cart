import { useMemo } from 'react';
import { CartItemType, calculatePaymentInfo } from '@entities/cart';
import { OrderItemIdListType } from '@entities/order';

export const useOrderCalculation = (
  cartItems: CartItemType[] | undefined,
  orderIdList: OrderItemIdListType,
) => {
  return useMemo(() => {
    const orderPrice =
      cartItems?.reduce((sum, { id, product, quantity }) => {
        if (orderIdList.includes(id)) {
          return sum + product.price * quantity;
        }
        return sum;
      }, 0) || 0;

    const { deliveryFee, orderTotalPrice } = calculatePaymentInfo(orderPrice);

    return {
      orderPrice,
      deliveryFee,
      orderTotalPrice,
    };
  }, [cartItems, orderIdList]);
};
