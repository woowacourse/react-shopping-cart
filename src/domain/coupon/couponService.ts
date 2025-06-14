import { CouponType } from "../../components/Coupon/types";
import { CartItemType } from "../../types/response";
import { makeCouponPermutation } from "../../utils/coupon";
import getCouponHandler from "./couponHandler";

interface DecideCanRedeemProps {
  coupon: CouponType;
  orderCost: number;
  selectedItems: CartItemType[];
  deliveryCost: number;
}

interface RedeemAllProps {
  selectedCoupons: CouponType[];
  orderCost: number;
  selectedItems: CartItemType[];
  deliveryCost: number;
}

const couponService = {
  decideCanRedeem: ({
    coupon,
    orderCost,
    selectedItems,
    deliveryCost,
  }: DecideCanRedeemProps) => {
    const couponHandler = getCouponHandler(coupon.discountType);

    return couponHandler.canRedeem({
      coupon,
      orderCost,
      selectedItems,
      deliveryCost,
    });
  },

  redeemAll: ({
    selectedCoupons,
    orderCost,
    selectedItems,
    deliveryCost,
  }: RedeemAllProps) => {
    return selectedCoupons.reduce((totalDiscount, coupon) => {
      const couponHandler = getCouponHandler(coupon.discountType);

      return (
        totalDiscount +
        couponHandler.calculate({
          coupon,
          orderCost,
          selectedItems,
          deliveryCost,
        })
      );
    }, 0);
  },

  calculateBestCouponDiscount: ({
    selectedCoupons,
    orderCost,
    selectedItems,
    deliveryCost,
  }: RedeemAllProps) => {
    if (selectedCoupons.length === 0) {
      return 0;
    }

    const permutations = makeCouponPermutation(
      selectedCoupons,
      selectedCoupons.length
    );

    return Math.max(
      ...permutations.map((coupons) =>
        couponService.redeemAll({
          selectedCoupons: coupons,
          orderCost,
          selectedItems,
          deliveryCost,
        })
      )
    );
  },
};

export default couponService;
