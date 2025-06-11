import { Coupon } from '@/features/Coupon/types/Coupon.types';
import { usePriceInfo } from './usePriceInfo';
import { calculateTotalDiscount } from '@/features/Coupon/utils/calculateTotalDiscount';
import { useCartContext } from '../context/CartProvider';

type Params = {
  selectedCoupons: Coupon[];
};

export const useFinalPriceInfo = ({ selectedCoupons }: Params) => {
  const { cartItems, isRemoteArea } = useCartContext();
  const { totalPrice, deliveryFee, orderPrice } = usePriceInfo();

  const selectedCartItems = cartItems.filter((item) => item.isChecked);
  const totalDiscount = calculateTotalDiscount(selectedCartItems, selectedCoupons, {
    isRemoteArea,
    totalPrice,
  });

  const finalPrice = totalPrice - totalDiscount;

  return {
    orderPrice,
    deliveryFee,
    totalDiscount,
    finalPrice,
  };
};
