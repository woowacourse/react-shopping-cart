import { CartItemType } from "@/apis/cartItems/cartItem.type";
import {
  BuyXGetYCoupon,
  Coupon,
  FixedCoupon,
  FreeShippingCoupon,
  PercentageCoupon,
} from "@/apis/coupon/coupon.type";
import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import { getIsExpiredDate } from "@/shared/utils/getIsExpiredDate";
import { getIsTimeAvailable } from "@/shared/utils/getIsTimeAvailable";

export const getIsCouponDisabled = (
  coupon: Coupon,
  orderList: CartItemType[]
) => {
  switch (coupon.discountType) {
    case "fixed": {
      return getIsFixedCouponDisabled(coupon, orderList);
    }
    case "buyXgetY": {
      return getIsBuyXGetYCouponDisabled(coupon, orderList);
    }
    case "freeShipping": {
      return getIsFreeShippingCouponDisabled(coupon, orderList);
    }
    case "percentage": {
      return getIsPercentageCouponDisabled(coupon);
    }
    default:
      return false;
  }
};

const getIsFixedCouponDisabled = (
  coupon: FixedCoupon,
  orderList: CartItemType[]
) => {
  const { minimumAmount, expirationDate } = coupon;
  if (getIsExpiredDate(expirationDate)) {
    return true;
  }

  const orderTotalPrice = getOrderTotalPrice(orderList);
  if (orderTotalPrice < minimumAmount) {
    return true;
  }

  return false;
};

const getIsBuyXGetYCouponDisabled = (
  coupon: BuyXGetYCoupon,
  orderList: CartItemType[]
) => {
  const { expirationDate, buyQuantity, getQuantity } = coupon;
  if (getIsExpiredDate(expirationDate)) {
    return true;
  }

  const isAllBelowRequiredQuantity = orderList.every(
    ({ quantity }) => quantity < buyQuantity + getQuantity
  );
  if (isAllBelowRequiredQuantity) {
    return true;
  }

  return false;
};

const getIsFreeShippingCouponDisabled = (
  coupon: FreeShippingCoupon,
  orderList: CartItemType[]
) => {
  const { expirationDate, minimumAmount } = coupon;
  if (getIsExpiredDate(expirationDate)) {
    return true;
  }

  const orderTotalPrice = getOrderTotalPrice(orderList);
  if (orderTotalPrice < minimumAmount) {
    return true;
  }

  return false;
};

const getIsPercentageCouponDisabled = (coupon: PercentageCoupon) => {
  const { expirationDate, availableTime } = coupon;
  if (getIsExpiredDate(expirationDate)) {
    return true;
  }

  const { start, end } = availableTime;
  if (!getIsTimeAvailable(start, end)) {
    return true;
  }

  return false;
};
