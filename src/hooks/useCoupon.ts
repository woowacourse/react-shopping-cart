import { useEffect, useMemo, useState } from "react";
import { CartItem, Coupon } from "../types/type";
import { LoadingStatus } from "./useCartItems";
import couponsApi from "../apis/couponsApi";
import { useSelected } from "./useSelected";
import { MAX_COUPON_COUNT } from "../constants";
import { calculateFixedDiscount } from "../utils/calculateFixedDiscount";
import { calculatePercentageDiscount } from "../utils/calculatePercentageDiscount";
import { calculateFreeShippingDiscount } from "../utils/calculateFreeShippingDiscount";
import { calculateBuyXgetYDiscount } from "../utils/calulateBuyXgetYDiscount";

interface useCouponProps {
  orderPrice: number;
  isRemoteArea: boolean;
  selectedItems: CartItem[];
}
export const useCoupon = ({
  orderPrice,
  isRemoteArea,
  selectedItems,
}: useCouponProps) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    selectedItemIds: selectedCouponIds,
    toggleSelectedItemId,
    replaceSelectedItemIds,
  } = useSelected({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCoupons();
      const { bestA, bestB } = bestCouponCombinationSuggestion(data);
      replaceSelectedItemIds([bestA, bestB]);
    };
    fetchData();
  }, []);

  const fetchCoupons = async () => {
    setLoadingStatus("fetching");
    try {
      const data = await couponsApi.get();
      setCoupons(data);
      setErrorMessage("");
      setLoadingStatus("success");
      return data;
    } catch (e) {
      setErrorMessage("Fail to Fetch Error");
      setLoadingStatus("error");
      return [];
    }
  };

  const bestCouponCombinationSuggestion = (coupons: Coupon[]) => {
    let bestCombinationAmount = 0;
    let bestA = 0;
    let bestB = 0;
    for (let i = 0; i < coupons.length; i++) {
      for (let j = i + 1; j < coupons.length; j++) {
        const couponDiscount = twoCouponsDiscount(
          coupons[i],
          coupons[j],
          orderPrice
        );
        if (bestCombinationAmount < couponDiscount) {
          bestCombinationAmount = couponDiscount;
          if (calculateCouponDiscount(coupons[i], orderPrice) > 0)
            bestA = coupons[i].id;
          if (calculateCouponDiscount(coupons[j], orderPrice) > 0)
            bestB = coupons[j].id;
        }
      }
    }

    return { bestA, bestB, bestCombinationAmount };
  };

  const twoCouponsDiscount = (
    couponA: Coupon,
    couponB: Coupon,
    orderPrice: number
  ): number => {
    const discountAFirst = calculateCouponDiscount(couponA, orderPrice);
    const remainingAfterA = orderPrice - discountAFirst;
    const discountBSecond = calculateCouponDiscount(couponB, remainingAfterA);
    const totalDiscountAB = discountAFirst + discountBSecond;

    const discountBFirst = calculateCouponDiscount(couponB, orderPrice);
    const remainingAfterB = orderPrice - discountBFirst;
    const discountASecond = calculateCouponDiscount(couponA, remainingAfterB);
    const totalDiscountBA = discountBFirst + discountASecond;

    return Math.max(totalDiscountAB, totalDiscountBA);
  };

  const isAvailableCoupon = (coupon: Coupon, price: number) => {
    return calculateCouponDiscount(coupon, price) > 0;
  };

  const calculateCouponDiscount = (coupon: Coupon, price: number) => {
    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(price, coupon);
      case "percentage":
        return calculatePercentageDiscount(price, coupon);
      case "freeShipping":
        return calculateFreeShippingDiscount(price, coupon, isRemoteArea);
      case "buyXgetY":
        return calculateBuyXgetYDiscount(coupon, selectedItems);
      default:
        return 0;
    }
  };

  const toggleCouponSelection = (id: number) => {
    const newSet = new Set(selectedCouponIds);
    const isAlreadySelected = newSet.has(id);
    if (isAlreadySelected || newSet.size < MAX_COUPON_COUNT) {
      toggleSelectedItemId(id);
    } else {
      alert(`쿠폰은 최대 ${MAX_COUPON_COUNT}개까지만 선택할 수 있습니다.`);
    }
  };

  const totalCouponDiscountAmount = useMemo(() => {
    const selectedCoupons = coupons.filter((coupon) =>
      selectedCouponIds.has(coupon.id)
    );

    if (selectedCoupons.length === 1) {
      return calculateCouponDiscount(selectedCoupons[0], orderPrice);
    }

    if (selectedCoupons.length === 2) {
      return twoCouponsDiscount(
        selectedCoupons[0],
        selectedCoupons[1],
        orderPrice
      );
    }
    return 0;
  }, [selectedCouponIds, coupons, orderPrice, isRemoteArea, selectedItems]);

  return {
    coupons,
    loadingStatus,
    errorMessage,
    selectedCouponIds,
    toggleCouponSelection,
    isAvailableCoupon,
    totalCouponDiscountAmount,
  };
};
