import { CartItem, CartItemList } from '@/features/Cart/types/Cart.types';

export const calculatePriceDetails = ({
  cartItems,
  specialDeliveryZone,
}: CartItemList & { specialDeliveryZone: boolean }) => {
  const totalPrice = calculateTotalPrice(cartItems);
  const deliveryFee = calculateDeliveryFee(totalPrice, specialDeliveryZone);
  const totalItemLength = calculateTotalItemLength(cartItems);

  return {
    totalPrice,
    deliveryFee,
    totalItemLength,
  };
};

const calculateTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};

const calculateDeliveryFee = (totalPrice: number, specialDeliveryZone: boolean) => {
  const baseFee = totalPrice >= 100000 ? 0 : 3000;
  const extraFee = specialDeliveryZone ? 3000 : 0;
  return baseFee + extraFee;
};

const calculateTotalItemLength = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};
