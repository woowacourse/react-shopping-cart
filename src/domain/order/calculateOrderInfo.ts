import { CartItemType } from '../mapper/cartItemMapper';

const calculateOrderInfo = (items: CartItemType[], isRemoteArea: boolean, totalCouponDiscount: number) => {
  const totalQuantity = calculateTotalQuantity(items);
  const totalOrderAmount = calculateOrderAmount(items);
  const basicDeliveryFee = calculateDeliveryFee(totalOrderAmount);
  const remoteAreaExtraFee = isRemoteArea ? 3000 : 0;
  const totalDeliveryFee = basicDeliveryFee + remoteAreaExtraFee;
  const finalPaymentAmount = totalOrderAmount + totalDeliveryFee - totalCouponDiscount;

  return {
    totalQuantity,
    totalOrderAmount,
    totalDeliveryFee,
    finalPaymentAmount
  };
};
export default calculateOrderInfo;

export const calculateOrderAmount = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const calculateDeliveryFee = (orderAmount: number): number => {
  return orderAmount >= 100_000 ? 0 : 3_000;
};

export const calculateTotalQuantity = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};
