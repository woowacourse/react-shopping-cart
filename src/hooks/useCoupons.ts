import { useCallback, useEffect, useRef, useState } from "react";
import { getCoupons } from "../apis/coupons/getCoupons";
import { Coupon } from "../types/response";
import useCartCalculations from "./useCartCalculations";
import useCart from "./useCart";
import { isCouponAvailable } from "../utils/coupons/isCouponAvailable";
import getBuyXGetYDiscount from "../utils/coupons/getBuyXGetYDiscount";
import getDiscountAmount from "../utils/coupons/getDiscountAmount";

type CouponWithAvailability = Coupon & {
  isAvailable: boolean;
};

const useCoupons = () => {
  const coupons = useRef<Coupon[]>([]);
  const [couponsWithAvailability, setCouponsWithAvailability] = useState<
    CouponWithAvailability[]
  >([]);
  const { orderPrice, shippingFee } = useCartCalculations();
  const { cartItemsCheckData } = useCart();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponsData = await getCoupons();
        coupons.current = couponsData;
        const updatedCoupons = couponsData.map((coupon) => ({
          ...coupon,
          isAvailable: isCouponAvailable(
            cartItemsCheckData,
            coupon,
            orderPrice
          ),
        }));
        setCouponsWithAvailability(updatedCoupons);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    };
    fetchCoupons();
  }, [orderPrice, cartItemsCheckData]);
  const getTotalCombinedDiscount = (
    coupon1: Coupon,
    coupon2: Coupon,
    orderPrice: number
  ): number => {
    const firstDiscount = getDiscountAmount(
      coupon1,
      orderPrice,
      cartItemsCheckData,
      shippingFee
    );
    const afterFirst =
      coupon1.discountType === "buyXgetY"
        ? orderPrice
        : orderPrice - firstDiscount;

    const secondDiscount = getDiscountAmount(
      coupon2,
      afterFirst,
      cartItemsCheckData,
      shippingFee
    );

    return firstDiscount + secondDiscount;
  };

  const getBestCouponCombination = (
    couponsWithAvailability: Coupon[],
    orderPrice: number
  ) => {
    let maxDiscount = 0;
    let bestCombination: Coupon[] = [];

    for (let i = 0; i < couponsWithAvailability.length; i++) {
      const coupon1 = couponsWithAvailability[i];
      const discount1 =
        coupon1.discountType === "fixed"
          ? coupon1.discount || 0
          : coupon1.discountType === "percentage"
          ? (orderPrice * (coupon1.discount || 0)) / 100
          : coupon1.discountType === "buyXgetY"
          ? getBuyXGetYDiscount(coupon1, cartItemsCheckData)
          : 0;

      if (discount1 > maxDiscount) {
        maxDiscount = discount1;
        bestCombination = [coupon1];
      }

      for (let j = 0; j < couponsWithAvailability.length; j++) {
        if (i === j) continue;
        const coupon2 = couponsWithAvailability[j];

        const discountA = getTotalCombinedDiscount(
          coupon1,
          coupon2,
          orderPrice
        );

        const discountB = getTotalCombinedDiscount(
          coupon2,
          coupon1,
          orderPrice
        );

        if (discountA > maxDiscount) {
          maxDiscount = discountA;
          bestCombination = [coupon1, coupon2];
        }
        if (discountB > maxDiscount) {
          maxDiscount = discountB;
          bestCombination = [coupon2, coupon1];
        }
      }
    }

    return {
      bestCombination,
      maxDiscount,
    };
  };
  const applyCoupons = useCallback(
    (selectedCoupons: Coupon[]) => {
      if (selectedCoupons.length === 0) {
        const { bestCombination, maxDiscount } = getBestCouponCombination(
          couponsWithAvailability,
          orderPrice
        );
        return {
          appliedCoupons: bestCombination,
          totalDiscount: maxDiscount,
        };
      } else if (selectedCoupons.length > 2) {
        const { bestCombination, maxDiscount } = getBestCouponCombination(
          selectedCoupons,
          orderPrice
        );
        return {
          appliedCoupons: bestCombination,
          totalDiscount: maxDiscount,
        };
      } else if (selectedCoupons.length === 2) {
        const [coupon1, coupon2] = selectedCoupons;
        const discountA = getTotalCombinedDiscount(
          coupon1,
          coupon2,
          orderPrice
        );
        const discountB = getTotalCombinedDiscount(
          coupon2,
          coupon1,
          orderPrice
        );

        if (discountA >= discountB) {
          return {
            appliedCoupons: [coupon1, coupon2],
            totalDiscount: discountA,
          };
        } else {
          return {
            appliedCoupons: [coupon2, coupon1],
            totalDiscount: discountB,
          };
        }
      } else {
        const coupon = selectedCoupons[0];
        const discount = getDiscountAmount(
          coupon,
          orderPrice,
          cartItemsCheckData,
          shippingFee
        );
        return {
          appliedCoupons: [coupon],
          totalDiscount: discount,
        };
      }
    },
    [
      orderPrice,
      cartItemsCheckData,
      getBestCouponCombination,
      couponsWithAvailability,
      shippingFee,
    ]
  );

  return {
    coupons: couponsWithAvailability,
    applyCoupons,
    getBestCouponCombination,
  };
};

export default useCoupons;
