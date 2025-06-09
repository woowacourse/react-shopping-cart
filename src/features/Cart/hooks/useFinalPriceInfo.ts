import { CartItem } from '@/features/Cart/types/Cart.types';
import { Coupon } from '@/features/Coupon/types/Coupon.types';
import { usePriceInfo } from './usePriceInfo';
import { calculateTotalDiscount } from '@/features/Coupon/utils/calculateTotalDiscount';
import { useCartContext } from '../context/CartProvider';

type Params = {
  cartItems: CartItem[];
  selectedCoupons: Coupon[];
};

export const useFinalPriceInfo = ({ cartItems, selectedCoupons }: Params) => {
  const { isRemoteArea } = useCartContext();
  const { totalPrice, deliveryFee, orderPrice } = usePriceInfo({ cartItems, isRemoteArea });

  const selectedCartItems = cartItems.filter((item) => item.isChecked);
  const totalDiscount = calculateTotalDiscount(selectedCartItems, selectedCoupons, {
    isRemoteArea,
    deliveryFee,
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
