import { useMemo } from 'react';
import { Content } from '../types/cartItems';
import { CouponsResponse } from '../types/coupons';
import { calculateDiscountAndTotalPrice } from '../utils/orderCalculate';

export function useOrderDiscount(
  selectedCoupons: CouponsResponse[],
  selectedItems: Content[],
  orderPrice: number,
  shippingFee: number
) {
  return useMemo(() => {
    return calculateDiscountAndTotalPrice(selectedCoupons, selectedItems, orderPrice, shippingFee);
  }, [selectedCoupons, selectedItems, orderPrice, shippingFee]);
}
