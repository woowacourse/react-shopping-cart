import { useMemo } from 'react';
import { getDeliveryFee } from '../routes/pages/OrderCheckPage/utils/product';
import {
  calculateTotalDiscount,
  Coupon,
} from '../routes/pages/OrderCheckPage/utils/coupon';
import { CartItemProps } from '../types/cartItem';

function useOrderSummary(
  selectedItems: CartItemProps[],
  selectedCoupons: Coupon[],
  isFarDelivery: boolean
) {
  const orderPrice = useMemo(() => {
    return selectedItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [selectedItems]);

  const deliveryFee = useMemo(() => {
    return getDeliveryFee(orderPrice, isFarDelivery);
  }, [orderPrice, isFarDelivery]);

  const totalDiscount = useMemo(() => {
    return calculateTotalDiscount(
      selectedCoupons,
      orderPrice,
      deliveryFee,
      selectedItems
    );
  }, [selectedCoupons, orderPrice, deliveryFee, selectedItems]);

  const paymentAmount = useMemo(() => {
    return orderPrice + deliveryFee - totalDiscount;
  }, [orderPrice, deliveryFee, totalDiscount]);

  return { orderPrice, deliveryFee, totalDiscount, paymentAmount };
}

export default useOrderSummary;
