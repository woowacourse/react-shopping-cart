import { useCartItemContext } from "../contexts/CartItemContext";
import { useShippingContext } from "../contexts/ShippingContext";
import { useCouponContext } from "../contexts/CouponContext";
import {
  FREE_SHIPPING_MIN_AMOUNT,
  SHIPPING_FEE,
  REMOTE_AREA_SHIPPING_FEE,
} from "../constants";
import { useCouponDiscount } from "./useCouponDiscount";

export const useCartSummary = () => {
  const { cartItems, selectedItem } = useCartItemContext();
  const { isRemoteAreaShipping } = useShippingContext();
  const { appliedCoupons } = useCouponContext();
  const { couponDiscount } = useCouponDiscount();

  const orderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItem.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);

  const hasFreeShippingCoupon = appliedCoupons.some(
    (coupon) => coupon.discountType === "freeShipping"
  );

  const baseShippingFee =
    orderPrice >= FREE_SHIPPING_MIN_AMOUNT || hasFreeShippingCoupon
      ? 0
      : SHIPPING_FEE;

  const remoteAreaShippingFee =
    isRemoteAreaShipping && !hasFreeShippingCoupon
      ? REMOTE_AREA_SHIPPING_FEE
      : 0;

  const shippingFee = baseShippingFee + remoteAreaShippingFee;
  const totalPrice = orderPrice - couponDiscount + shippingFee;
  const baseTotalPrice = orderPrice + baseShippingFee;

  return {
    orderPrice,
    shippingFee,
    totalPrice,
    couponDiscount,
    baseShippingFee,
    baseTotalPrice,
  };
};
