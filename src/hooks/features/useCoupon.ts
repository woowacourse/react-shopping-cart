import { useState } from "react";
import type { CouponType, CartItemType } from "../../types/response";
import { getCouponList } from "../../services/couponService";
import useApiHandler from "../@common/useApiHandler";
import {
  getAllValidCoupons,
  getValidExpirationCoupons,
} from "../../domains/coupon/validateCoupon";
import { useEffect } from "react";
import { getMaxDiscountCombinations } from "../../domains/coupon/calculateCoupon";
import { COUPON_LIMIT } from "../../constants/systemConstants";

interface UseCouponProps {
  orderPrice: number;
  deliveryFee: number;
  orderItems: CartItemType[];
}

const useCoupon = ({ orderPrice, deliveryFee, orderItems }: UseCouponProps) => {
  const [couponList, setCouponList] = useState<CouponType[]>([]);
  const [isCheckedCoupons, setIsCheckedCoupons] = useState<
    Map<number, CouponType>
  >(new Map());

  const { callApi, loadingState } = useApiHandler();

  useEffect(() => {
    const fetchData = async () => {
      const couponList = await callApi<CouponType[]>(
        getCouponList,
        "쿠폰 목록을 불러왔습니다.",
        "initialLoading"
      );
      if (!couponList) return;

      const visibleCouponList = getValidExpirationCoupons(couponList);
      setCouponList(visibleCouponList);

      const validCouponList = getAllValidCoupons(couponList, {
        originOrderPrice: orderPrice,
        orderItems,
        deliveryFee,
      });
      const maxDiscountCombination = getMaxDiscountCombinations(
        validCouponList,
        {
          originOrderPrice: orderPrice,
          deliveryFee,
        }
      );
      console.log(maxDiscountCombination);

      setIsCheckedCoupons(
        new Map(maxDiscountCombination.map((coupon) => [coupon.id, coupon]))
      );
    };

    fetchData();
  }, []);

  const toggleCheckedCoupon = (couponInfo: CouponType) => {
    if (isCheckedCoupons.has(couponInfo.id)) {
      removeCheckedCoupon(couponInfo);
      return;
    }
    addCheckedCoupon(couponInfo);
  };

  const addCheckedCoupon = (couponInfo: CouponType) => {
    if (isCheckedCoupons.size >= COUPON_LIMIT) return;
    setIsCheckedCoupons((prev: Map<number, CouponType>) => {
      const newIsCheckedCoupons = new Map(prev);
      newIsCheckedCoupons.set(couponInfo.id, couponInfo);
      return newIsCheckedCoupons;
    });
  };

  const removeCheckedCoupon = (couponInfo: CouponType) => {
    setIsCheckedCoupons((prev: Map<number, CouponType>) => {
      const newIsCheckedCoupons = new Map(prev);
      newIsCheckedCoupons.delete(couponInfo.id);
      return newIsCheckedCoupons;
    });
  };

  return {
    couponList,
    validCouponList: getAllValidCoupons(couponList, {
      originOrderPrice: orderPrice,
      orderItems,
      deliveryFee,
    }),
    loadingState,
    isCheckedCoupons,
    toggleCheckedCoupon,
  };
};

export default useCoupon;
