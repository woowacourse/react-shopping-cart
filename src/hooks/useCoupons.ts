import { useCallback, useEffect, useState } from "react";
import { getCoupons } from "../apis/coupons/getCoupons";
import { Coupon } from "../types/response";
import useCartCalculations from "./useCartCaculations";
import useCart from "./useCart";
import { CartItemCheckType } from "./useCartAPI";
import {
  isCouponAvailable,
  isFreeShippingAvailable,
} from "../utils/coupons/isCouponAvailable";

type CouponWithAvailability = Coupon & {
  isAvailable: boolean;
};

const SHIPPING_FEE = 3000;

const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponsWithAvailability, setCouponsWithAvailability] = useState<
    CouponWithAvailability[]
  >([]);
  const { orderPrice } = useCartCalculations();
  const { cartItemsCheckData } = useCart();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponsData = await getCoupons();
        setCoupons(couponsData);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    };
    fetchCoupons();
  }, []);

  useEffect(() => {
    const updatedCoupons = coupons.map((coupon) => ({
      ...coupon,
      isAvailable: isCouponAvailable(cartItemsCheckData, coupon, orderPrice),
    }));
    setCouponsWithAvailability(updatedCoupons);
  }, [coupons, orderPrice]);

  const getTotalCombinedDiscount = (
    coupon1: Coupon,
    coupon2: Coupon,
    orderPrice: number,
    cartItems: CartItemCheckType[]
  ): number => {
    const getDiscountAmount = (
      coupon: Coupon,
      currentPrice: number
    ): number => {
      switch (coupon.discountType) {
        case "fixed":
          return coupon.discount || 0;
        case "percentage":
          return (currentPrice * (coupon.discount || 0)) / 100;
        case "buyXgetY":
          return getBuyXGetYDiscount(coupon, cartItems);
        case "freeShipping":
          return isFreeShippingAvailable(coupon, orderPrice) ? SHIPPING_FEE : 0;
        default:
          return 0;
      }
    };

    const firstDiscount = getDiscountAmount(coupon1, orderPrice);
    const afterFirst =
      coupon1.discountType === "buyXgetY"
        ? orderPrice
        : orderPrice - firstDiscount;

    const secondDiscount = getDiscountAmount(coupon2, afterFirst);

    return firstDiscount + secondDiscount;
  };

  const getBuyXGetYDiscount = (
    coupon: Coupon,
    cartItems: CartItemCheckType[]
  ) => {
    const { buyQuantity, getQuantity } = coupon;

    if (typeof buyQuantity !== "number" || typeof getQuantity !== "number") {
      return 0;
    }

    const eligibleItems = cartItems.filter(
      (item) => item.quantity === buyQuantity + getQuantity
    );

    if (eligibleItems.length === 0) return 0;

    const mostExpensiveItem = eligibleItems.reduce((prev, curr) =>
      curr.price > prev.price ? curr : prev
    );

    const discount = getQuantity * mostExpensiveItem.price;

    return discount;
  };

  const getBestCouponCombination = (coupons: Coupon[], orderPrice: number) => {
    let maxDiscount = 0;
    let bestCombination: Coupon[] = [];

    for (let i = 0; i < coupons.length; i++) {
      const coupon1 = coupons[i];
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

      for (let j = 0; j < coupons.length; j++) {
        if (i === j) continue;
        const coupon2 = coupons[j];

        const discountA = getTotalCombinedDiscount(
          coupon1,
          coupon2,
          orderPrice,
          cartItemsCheckData
        );

        const discountB = getTotalCombinedDiscount(
          coupon2,
          coupon1,
          orderPrice,
          cartItemsCheckData
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
          coupons,
          orderPrice
        );
        return {
          appliedCoupons: bestCombination,
          totalDiscount: maxDiscount,
        };
      } else {
        const totalDiscount = selectedCoupons.reduce((acc, coupon) => {
          if (coupon.discountType === "fixed") {
            return acc + (coupon.discount || 0);
          } else if (coupon.discountType === "percentage") {
            const discountPercent = Math.min(coupon.discount || 0, 100);
            return acc + (orderPrice * discountPercent) / 100;
          } else if (coupon.discountType === "buyXgetY") {
            return acc + getBuyXGetYDiscount(coupon, cartItemsCheckData);
          } else if (coupon.discountType === "freeShipping") {
            return acc + SHIPPING_FEE;
          } else {
            return acc;
          }
        }, 0);
        return {
          appliedCoupons: selectedCoupons,
          totalDiscount,
        };
      }
    },
    [orderPrice, cartItemsCheckData, getBestCouponCombination]
  );

  return {
    coupons: couponsWithAvailability,
    applyCoupons,
    getBestCouponCombination,
  };
};

export default useCoupons;
