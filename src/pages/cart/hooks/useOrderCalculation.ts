import { useMemo } from 'react';
import { CartItemType, OrderItemType } from '@/apis/cartItems/cartItem.type';
import { calculatePaymentInfo } from '@/shared/utils/orderPricing';

export const useOrderCalculation = (
  cartItems: CartItemType[] | undefined,
  orderIdList: OrderItemType,
) => {
  return useMemo(() => {
    const orderTotalPrice =
      cartItems?.reduce((sum, { id, product, quantity }) => {
        if (orderIdList.includes(id)) {
          return sum + product.price * quantity;
        }
        return sum;
      }, 0) || 0;

    const { deliveryFee, paymentAmount } = calculatePaymentInfo(orderTotalPrice);

    return {
      orderTotalPrice,
      deliveryFee,
      paymentAmount,
    };
  }, [cartItems, orderIdList]);
};
