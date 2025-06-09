import {
  BuyXGetYCouponType,
  CouponType,
  FixedCouponType,
  FreeShippingCouponType,
  PercentageCouponType,
} from "../components/Coupon/types";
import { DISCOUNT_TYPE_KEY } from "../constants/coupon";
import { CartItemType } from "../types/response";

const useCoupon = () => {
  const filterNonExpiredCoupons = (coupons: CouponType[]) => {
    const today = new Date().setHours(0, 0, 0, 0);

    return coupons.filter((coupon) => {
      const { year, month, day } = coupon.expirationDate;
      const expiredDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      ).setHours(0, 0, 0, 0);

      return expiredDate >= today;
    });
  };

  const isValidOrderCostToRedeem = (
    coupon: FixedCouponType | FreeShippingCouponType,
    orderCost: number
  ) => {
    const { minimumAmount } = coupon;
    return minimumAmount <= orderCost;
  };

  const isValidTimeToRedeem = (coupon: PercentageCouponType) => {
    const { start, end } = coupon.availableTime;
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const startMinutes = start.hour * 60 + start.minute;
    const endMinutes = end.hour * 60 + end.minute;

    return startMinutes <= nowMinutes && endMinutes >= nowMinutes;
  };

  const getMultipleQuantityItem = (
    coupon: BuyXGetYCouponType,
    selectedCartItems: CartItemType[]
  ) => {
    const { buyQuantity } = coupon;
    const multipleItems = selectedCartItems.filter(
      (items) => items.quantity >= buyQuantity
    );

    return multipleItems;
  };

  const isValidQuantityToRedeem = (
    coupon: BuyXGetYCouponType,
    selectedCartItems: CartItemType[]
  ) => {
    const multipleItems = getMultipleQuantityItem(coupon, selectedCartItems);
    return multipleItems.length > 0;
  };

  const calculatePercentageDiscount = (
    coupon: PercentageCouponType,
    orderCost: number
  ) => {
    const { discount } = coupon;
    return orderCost * (discount / 100);
  };

  const calculateBuyXGetYDiscount = (
    coupon: BuyXGetYCouponType,
    multipleItems: CartItemType[]
  ) => {
    const { getQuantity } = coupon;
    const highestPrice = Math.max(
      ...multipleItems.map((item) => item.product.price)
    );

    return highestPrice * getQuantity;
  };

  const calculateFixedDiscount = (coupon: FixedCouponType) => {
    const { discount } = coupon;
    return discount;
  };

  const calculateFreeShipping = (deliveryCost: number) => {
    return deliveryCost;
  };

  const checkCanRedeem = (
    coupon: CouponType,
    orderCost: number,
    selectedCartItems: CartItemType[]
  ) => {
    const { discountType } = coupon;
    switch (discountType) {
      case DISCOUNT_TYPE_KEY.fixed:
        return isValidOrderCostToRedeem(coupon, orderCost);

      case DISCOUNT_TYPE_KEY.buyXgetY:
        {
          const multipleItems = getMultipleQuantityItem(
            coupon,
            selectedCartItems
          );
          calculateBuyXGetYDiscount(coupon, multipleItems);
        }
        return isValidQuantityToRedeem(coupon, selectedCartItems);

      case DISCOUNT_TYPE_KEY.freeShipping:
        return isValidOrderCostToRedeem(coupon, orderCost);

      case DISCOUNT_TYPE_KEY.percentage:
        return isValidTimeToRedeem(coupon);

      default:
        throw new Error(
          "존재하지 않는 쿠폰 타입입니다. discountType을 확인해주세요."
        );
    }
  };

  const redeemCoupon = (
    coupon: CouponType,
    orderCost: number,
    selectedCartItems: CartItemType[],
    deliveryCost: number
  ) => {
    const { discountType } = coupon;
    switch (discountType) {
      case DISCOUNT_TYPE_KEY.fixed:
        return calculateFixedDiscount(coupon);

      case DISCOUNT_TYPE_KEY.buyXgetY: {
        const multipleItems = getMultipleQuantityItem(
          coupon,
          selectedCartItems
        );

        return calculateBuyXGetYDiscount(coupon, multipleItems);
      }

      case DISCOUNT_TYPE_KEY.freeShipping:
        return calculateFreeShipping(deliveryCost);

      case DISCOUNT_TYPE_KEY.percentage:
        return calculatePercentageDiscount(coupon, orderCost);

      default:
        throw new Error(
          "존재하지 않는 쿠폰 타입입니다. discountType을 확인해주세요."
        );
    }
  };

  const redeemAllCoupon = (
    selectedCoupons: CouponType[],
    orderCost: number,
    selectedCartItems: CartItemType[],
    deliveryCost: number
  ) => {
    return selectedCoupons.reduce((totalDiscount, targetCoupon) => {
      return (
        totalDiscount +
        redeemCoupon(targetCoupon, orderCost, selectedCartItems, deliveryCost)
      );
    }, 0);
  };

  return {
    filterNonExpiredCoupons,
    checkCanRedeem,
    redeemAllCoupon,
  };
};

export default useCoupon;
