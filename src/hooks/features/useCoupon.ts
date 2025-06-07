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
  const [checkedCoupons, setCheckedCoupons] = useState<Map<number, CouponType>>(
    new Map()
  );

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

      setCheckedCoupons(
        new Map(maxDiscountCombination.map((coupon) => [coupon.id, coupon]))
      );
    };

    fetchData();
  }, []);

  const toggleCheckedCoupon = (couponInfo: CouponType) => {
    if (checkedCoupons.has(couponInfo.id)) {
      removeCheckedCoupon(couponInfo);
      return;
    }
    addCheckedCoupon(couponInfo);
  };

  const addCheckedCoupon = (couponInfo: CouponType) => {
    if (checkedCoupons.size >= COUPON_LIMIT) return;
    setCheckedCoupons((prev: Map<number, CouponType>) => {
      const newCheckedCoupons = new Map(prev);
      newCheckedCoupons.set(couponInfo.id, couponInfo);
      return newCheckedCoupons;
    });
  };

  const removeCheckedCoupon = (couponInfo: CouponType) => {
    setCheckedCoupons((prev: Map<number, CouponType>) => {
      const newCheckedCoupons = new Map(prev);
      newCheckedCoupons.delete(couponInfo.id);
      return newCheckedCoupons;
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
    checkedCoupons,
    toggleCheckedCoupon,
  };
};

export default useCoupon;
