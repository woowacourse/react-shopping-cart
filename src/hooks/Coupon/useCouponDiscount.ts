import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { useCouponCalculation } from "./useCouponCalculation";

export interface CouponDiscountResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
}

interface useCouponDiscountProps {
  selectedCoupons: Coupon[] | undefined;
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean;
}

const useCouponDiscount = ({
  selectedCoupons = [],
  selectedShoppingCartItems,
  isIsland = false,
}: useCouponDiscountProps): CouponDiscountResult => {
  const calculationResult = useCouponCalculation({
    coupons: selectedCoupons,
    selectedShoppingCartItems,
    isIsland,
  });

  return {
    orderTotal: calculationResult.orderTotal,
    shippingFee: calculationResult.shippingFee,
    discountTotal: calculationResult.discountTotal,
    finalTotal: calculationResult.finalTotal,
  };
};

export { useCouponDiscount };
