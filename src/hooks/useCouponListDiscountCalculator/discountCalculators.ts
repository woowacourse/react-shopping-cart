import { CartItem } from "../../types/cartItems";
import {
  BuyXGetYCouponResponse,
  FixedDiscountCouponResponse,
  PercentageDiscountCouponResponse,
} from "../../types/couponResponses";
import { calculateProportionalAmount } from "../../utils/math/calculateProportionalAmount";
import { getMaxNumberFromList } from "../../utils/math/getMaxFromNumberList";
import { roundDownToTens } from "../../utils/math/roundDownToTens";

export const calculateFixedDiscountAmount = (coupon: FixedDiscountCouponResponse): number => {
  // 고정 할인 쿠폰 - 쿠폰의 할인 금액을 반환
  return coupon.discount;
};

export const calculatePercentageDiscountAmount = (
  // 퍼센트 할인 쿠폰 - 쿠폰의 할인 비율을 적용한 할인 금액을 반환
  coupon: PercentageDiscountCouponResponse,
  totalAmount: number
): number => {
  const discountAmount = calculateProportionalAmount(coupon.discount, totalAmount);
  const roundedDiscountAmount = roundDownToTens(discountAmount);

  return roundedDiscountAmount;
};

export const calculateBuyXGetYDiscountAmount = (
  // X + Y 증정 쿠폰 - 특정 상품을 X + Y개를 구매할 때 Y개만큼의 할인 금액을 반환 (여러 종류의 할인 가능 상품이 있을 경우 최대 할인 금액을 반환)
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
  // 무료 배송 쿠폰 - 배송비를 반환
  return shippingCost;
};
