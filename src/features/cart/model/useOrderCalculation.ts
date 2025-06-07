import { useMemo } from 'react';
import { CartItemType, OrderItemType } from '@entities/cart';
import { calculatePaymentInfo } from '@/features/cart/utils/cartPriceCalculator';

export const useOrderCalculation = (
  cartItems: CartItemType[] | undefined,
  orderIdList: OrderItemType,
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
