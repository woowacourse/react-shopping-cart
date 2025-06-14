import {
  BuyXGetYCouponType,
  FixedCouponType,
  FreeShippingCouponType,
  PercentageCouponType,
} from "../../components/Coupon/types";
import { DISCOUNT_TYPE_KEY } from "../../constants/coupon";
import { CartItemType, DiscountType } from "../../types/response";
import { isNowInRange } from "../../utils/date";

interface HandlerProps<T> {
  coupon: T;
  orderCost: number;
  selectedItems: CartItemType[];
  deliveryCost: number;
}

interface HandlerType<T> {
  canRedeem: (params: HandlerProps<T>) => boolean;
  calculate: (params: HandlerProps<T>) => number;
}

type CouponMapType = {
  [DISCOUNT_TYPE_KEY.fixed]: FixedCouponType;
  [DISCOUNT_TYPE_KEY.percentage]: PercentageCouponType;
  [DISCOUNT_TYPE_KEY.buyXgetY]: BuyXGetYCouponType;
  [DISCOUNT_TYPE_KEY.freeShipping]: FreeShippingCouponType;
};

type CouponHandlerMapType = {
  [K in keyof CouponMapType]: HandlerType<CouponMapType[K]>;
};

const couponHandlerMap: CouponHandlerMapType = {
  [DISCOUNT_TYPE_KEY.fixed]: {
    canRedeem: ({ coupon, orderCost }) => coupon.minimumAmount <= orderCost,
    calculate: ({ coupon }) => coupon.discount,
  },

  [DISCOUNT_TYPE_KEY.percentage]: {
    canRedeem: ({ coupon }) => {
      const { start, end } = coupon.availableTime;
      return isNowInRange(start, end);
    },
    calculate: ({ coupon, orderCost }) => orderCost * (coupon.discount / 100),
  },

  [DISCOUNT_TYPE_KEY.buyXgetY]: {
    canRedeem: ({ coupon, selectedItems }) => {
      const { buyQuantity } = coupon;
      return selectedItems.some((item) => item.quantity >= buyQuantity);
    },
    calculate: ({ coupon, selectedItems }) => {
      const { getQuantity } = coupon;
      const validItems = selectedItems.filter((item) => {
        return item.quantity >= getQuantity;
      });
      const maxPrice = Math.max(
        ...validItems.map((item) => item.product.price)
      );
      return maxPrice * getQuantity;
    },
  },

  [DISCOUNT_TYPE_KEY.freeShipping]: {
    canRedeem: ({ coupon, orderCost }) => coupon.minimumAmount <= orderCost,
    calculate: ({ deliveryCost }) => deliveryCost,
  },
};

const getCouponHandler = <K extends DiscountType>(
  type: K
): HandlerType<CouponMapType[K]> => {
  return couponHandlerMap[type];
};

export default getCouponHandler;
