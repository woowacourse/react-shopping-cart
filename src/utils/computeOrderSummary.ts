import { useCartContext } from '../context/CartContext';
import { validatedCouponList } from '../types/coupon';
import {
  calculateFinalPrice,
  calculateShippingFee,
  getAvailableCoupons,
  getBestCouponCombo,
  hasFreeShippingCoupon,
} from './couponDiscount';

export function computeOrderSummary({
  validatedCouponList,
  checkedCoupons,
  isRemotedAreaChecked,
}: {
  validatedCouponList: validatedCouponList[];
  checkedCoupons: number[] | null;
  isRemotedAreaChecked: boolean;
}) {
  const cart = useCartContext();

  const availableCouponList = getAvailableCoupons(validatedCouponList);
  const comboResult = getBestCouponCombo(
    checkedCoupons,
    cart.selectedCartItems,
    availableCouponList,
    cart.subTotal,
    cart.deliveryFee
  );

  const hasFreeShipping = hasFreeShippingCoupon(comboResult?.combo ?? []);

  const deliveryFee = calculateShippingFee(
    cart.deliveryFee,
    hasFreeShipping,
    isRemotedAreaChecked
  );

  const finalPrice = calculateFinalPrice(
    comboResult?.PriceWithDiscount ?? 0,
    deliveryFee
  );

  return { comboResult, deliveryFee, finalPrice };
}
