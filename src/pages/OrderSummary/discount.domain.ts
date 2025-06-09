import {
  BuyXGetYCoupon,
  CouponType,
  FixedCoupon,
  PercentageCoupon,
} from "../../types/coupon";
import { CartItemType } from "../../types/response";

export function calculateDiscountAmount({
  price,
  cartItems,
  deliveryCost,
  selectedCoupon,
}: {
  price: number;
  cartItems: CartItemType[];
  deliveryCost: number;
  selectedCoupon: CouponType[];
}): number {
  if (selectedCoupon.length === 0) return 0;

  if (selectedCoupon.length === 1) {
    return getDiscountAmount(selectedCoupon[0], price, cartItems, deliveryCost);
  }

  const discountAfterFirst = applyCouponsInOrder(
    selectedCoupon,
    price,
    cartItems,
    deliveryCost
  );

  const discountBeforeFirst = applyCouponsInOrder(
    [...selectedCoupon].reverse(),
    price,
    cartItems,
    deliveryCost
  );

  return Math.max(discountAfterFirst, discountBeforeFirst);
}

function applyCouponsInOrder(
  coupons: CouponType[],
  initialPrice: number,
  cartItems: CartItemType[],
  deliveryCost: number
): number {
  return coupons.reduce((acc, coupon) => {
    const discounted = getDiscountAmount(
      coupon,
      initialPrice - acc,
      cartItems,
      deliveryCost
    );
    return acc + discounted;
  }, 0);
}

function getDiscountAmount(
  coupon: CouponType,
  price: number,
  cartItems: CartItemType[],
  shippingCost: number
): number {
  switch (coupon.discountType) {
    case "fixed":
      return calculateFixedDiscount(coupon as FixedCoupon);

    case "percentage":
      return calculatePercentageDiscount(coupon as PercentageCoupon, price);

    case "freeShipping":
      return calculateFreeShippingDiscount(shippingCost);

    case "buyXgetY":
      return calculateBuyXGetYDiscount(coupon as BuyXGetYCoupon, cartItems);

    default:
      return 0;
  }
}

function calculateFixedDiscount(coupon: FixedCoupon): number {
  return Math.max(0, coupon.discount);
}

function calculatePercentageDiscount(
  coupon: PercentageCoupon,
  price: number
): number {
  return Math.floor(price * (coupon.discount / 100));
}

function calculateFreeShippingDiscount(shippingCost: number): number {
  return Math.max(0, shippingCost);
}

function calculateBuyXGetYDiscount(
  coupon: BuyXGetYCoupon,
  cartItems: CartItemType[]
): number {
  const { buyQuantity, getQuantity } = coupon;

  const eligibleItems = cartItems.filter(
    (item) => item.quantity >= buyQuantity + getQuantity
  );

  if (eligibleItems.length === 0) return 0;

  const sorted = eligibleItems.sort((a, b) => {
    if (b.product.price !== a.product.price) {
      return b.product.price - a.product.price;
    }
    return b.quantity - a.quantity;
  });

  const topItem = sorted[0];
  const setCount = Math.floor(topItem.quantity / (buyQuantity + getQuantity));

  return setCount * topItem.product.price;
}
