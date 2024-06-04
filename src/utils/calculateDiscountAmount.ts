import { COUPON_DISCOUNT_TYPE } from "@/constants/system";
import { CartItemType } from "@/types/cart.type";
import { CouponType } from "@/types/coupon.type";

const calculateFixedDiscount = (coupon: CouponType) => {
  return coupon.discount ?? 0;
};

const calculatePercentageDiscount = (
  coupon: CouponType,
  totalAmount: number
) => {
  return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
};

const calculateBuyXgetYDiscount = (
  coupon: CouponType,
  selectedItems: CartItemType[]
) => {
  const minimumQuantity =
    coupon.buyQuantity &&
    coupon.getQuantity &&
    coupon.buyQuantity + coupon.getQuantity;

  if (!minimumQuantity) {
    return 0;
  }

  const mostExpensiveItem = selectedItems.reduce((accMaxAmount, curItem) => {
    if (minimumQuantity <= curItem.quantity) {
      return Math.max(accMaxAmount, curItem.product.price);
    }
    return accMaxAmount;
  }, 0);

  return mostExpensiveItem * (coupon.getQuantity ?? 0);
};

const calculateFreeShippingDiscount = (shippingFee: number) => {
  return shippingFee;
};

interface Props {
  coupon: CouponType;
  orderPrice: number;
  selectedItems: CartItemType[];
  shippingFee: number;
}

export const calculateDiscountAmount = ({
  coupon,
  orderPrice,
  selectedItems,
  shippingFee,
}: Props) => {
  switch (coupon.discountType) {
    case COUPON_DISCOUNT_TYPE.fixed:
      return calculateFixedDiscount(coupon);
    case COUPON_DISCOUNT_TYPE.percentage:
      return calculatePercentageDiscount(coupon, orderPrice);
    case COUPON_DISCOUNT_TYPE.buyXgetY:
      return calculateBuyXgetYDiscount(coupon, selectedItems);
    case COUPON_DISCOUNT_TYPE.freeShipping:
      return calculateFreeShippingDiscount(shippingFee);
    default:
      return 0;
  }
};
