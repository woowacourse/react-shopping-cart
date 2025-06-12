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
import { useMapState } from "../@common/useMapState";

interface UseCouponProps {
  orderPrice: number;
  deliveryFee: number;
  orderItems: CartItemType[];
}

const useCoupon = ({ orderPrice, deliveryFee, orderItems }: UseCouponProps) => {
  const [couponList, setCouponList] = useState<CouponType[]>([]);
  const {
    map: checkedCoupons,
    add,
    remove,
  } = useMapState<number, CouponType>({
    initialValue: new Map(),
  });

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

      maxDiscountCombination.forEach((coupon) => {
        add(coupon.id, coupon);
      });
    };

    fetchData();
  }, []);

  const addCheckedCoupon = (couponInfo: CouponType) => {
    if (checkedCoupons.size >= COUPON_LIMIT) return;
    add(couponInfo.id, couponInfo);
  };

  const toggleCheckedCoupon = (couponInfo: CouponType) => {
    if (checkedCoupons.has(couponInfo.id)) {
      remove(couponInfo.id);
      return;
    }
    addCheckedCoupon(couponInfo);
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
