import { useEffect, useState } from "react";
import { getCoupons } from "../apis/coupons/getCoupons";
import { Coupon } from "../types/response";
import getCurrentTime, { CurrentTime } from "../utils/getCurrentTIme";
import useCartCalculations from "./useCartCaculations";

const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { orderPrice } = useCartCalculations();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponsData = await getCoupons();
        const couponsWithAvailability = couponsData.map((coupon) => ({
          ...coupon,
          isAvailable: isCouponAvailable(coupon),
        }));
        setCoupons(couponsWithAvailability);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    };

    fetchCoupons();
  }, [orderPrice]);

  const isExpired = (
    expirationDate: string,
    currentTime: Omit<CurrentTime, "currentHour">
  ): boolean => {
    const { currentYear, currentMonth, currentDate } = currentTime;

    const [yearStr, monthStr, dayStr] = expirationDate.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    if (year < currentYear) return true;
    if (year === currentYear && month < currentMonth) return true;
    if (year === currentYear && month === currentMonth && day < currentDate)
      return true;

    return false;
  };

  const isMorningTime = (
    availableTime: { start: string; end: string },
    currentHour: number
  ) => {
    const [startHour] = availableTime.start.split(":").map(Number);
    const [endHour] = availableTime.end.split(":").map(Number);

    return currentHour >= startHour && currentHour < endHour;
  };

  const isMoreThanMinimumAmount = (
    minimumAmount: number,
    orderPrice: number
  ) => {
    if (!minimumAmount) return true;

    return minimumAmount <= orderPrice;
  };

  const isCouponAvailable = (coupon: Coupon) => {
    const { expirationDate, availableTime } = coupon;

    const { currentYear, currentMonth, currentDate, currentHour } =
      getCurrentTime();

    const notExpired = !isExpired(expirationDate, {
      currentYear,
      currentMonth,
      currentDate,
    });

    const withinAvailableTime = availableTime
      ? isMorningTime(availableTime, currentHour)
      : true;

    const moreThanMinimumAmount = isMoreThanMinimumAmount(
      Number(coupon.minimumAmount),
      orderPrice
    );

    return notExpired && withinAvailableTime && moreThanMinimumAmount;
  };

  const getBestCouponCombination = (coupons: Coupon[], orderPrice: number) => {
    let maxDiscount = 0;
    let bestCombination: Coupon[] = [];

    for (let i = 0; i < coupons.length; i++) {
      const coupon = coupons[i];
      const discount =
        coupon.discountType === "amount"
          ? coupon.discount || 0
          : (orderPrice * (coupon.discount || 0)) / 100;
      if (discount > maxDiscount) {
        maxDiscount = discount;
        bestCombination = [coupon];
      }
    }

    for (let i = 0; i < coupons.length; i++) {
      for (let j = i + 1; j < coupons.length; j++) {
        const coupon1 = coupons[i];
        const coupon2 = coupons[j];

        const discount1 =
          coupon1.discountType === "amount"
            ? coupon1.discount || 0
            : (orderPrice * (coupon1.discount || 0)) / 100;

        const discount2 =
          coupon2.discountType === "amount"
            ? coupon2.discount || 0
            : (orderPrice * (coupon2.discount || 0)) / 100;

        const totalDiscount = discount1 + discount2;

        if (totalDiscount > maxDiscount) {
          maxDiscount = totalDiscount;
          bestCombination = [coupon1, coupon2];
        }
      }
    }
    return {
      bestCombination,
      maxDiscount,
    };
  };

  const applyCoupons = (selectedCoupons: Coupon[]) => {
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
        if (coupon.discountType === "amount") {
          return acc + (coupon.discount || 0);
        } else if (coupon.discountType === "percentage") {
          return acc + (orderPrice * (coupon.discount || 0)) / 100;
        }
        return acc;
      }, 0);

      return {
        appliedCoupons: selectedCoupons,
        totalDiscount,
      };
    }
  };
  return { coupons, applyCoupons };
};

export default useCoupons;
