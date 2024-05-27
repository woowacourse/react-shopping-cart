import { CartItem } from "../../../types/cartItems";
import {
  BuyXGetYCouponResponse,
  FixedDiscountCouponResponse,
  PercentageDiscountCouponResponse,
} from "../../../types/couponResponses";
import { calculateProportionalAmount } from "../../../utils/math/calculateProportionalAmount";
import { getMaxNumberFromList } from "../../../utils/math/getMaxFromNumberList";
import { roundDownToTens } from "../../../utils/math/roundDownToTens";

export const calculateFixedDiscountAmount = (coupon: FixedDiscountCouponResponse): number => {
  return coupon.discount;
};

export const calculatePercentageDiscountAmount = (
  coupon: PercentageDiscountCouponResponse,
  totalAmount: number
): number => {
  const discountAmount = calculateProportionalAmount(coupon.discount, totalAmount);
  const roundedDiscountAmount = roundDownToTens(discountAmount);

  return roundedDiscountAmount;
};

export const calculateBuyXGetYDiscountAmount = (
  coupon: BuyXGetYCouponResponse,
  cartItems: CartItem[]
): number => {
  const { buyQuantity, getQuantity } = coupon;
  const eligibleItems = cartItems.filter(
    ({ isSelected, quantity }) => isSelected && quantity >= buyQuantity + getQuantity
  );
  const eligibleItemPrices = eligibleItems.map(({ product: { price } }) => price);

  return getMaxNumberFromList(eligibleItemPrices);
};

export const calculateFreeShippingDiscountAmount = (shippingCost: number): number => {
  return shippingCost;
};
