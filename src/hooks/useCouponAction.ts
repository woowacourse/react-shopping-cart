import { useCallback } from "react";
import { useSelectedCouponDispatch } from "../stores/SelectedCouponContext";
import { CouponType } from "../types/types";

function useCouponAction() {
  const selectedCouponDispatch = useSelectedCouponDispatch();

  const addCoupon = useCallback(
    (data: CouponType) => {
      selectedCouponDispatch({
        type: "ADD_COUPON",
        payload: { coupon: data },
      });
    },
    [selectedCouponDispatch]
  );

  const removeCoupon = useCallback(
    (data: CouponType) => {
      selectedCouponDispatch({
        type: "REMOVE_COUPON",
        payload: { coupon: data },
      });
    },
    [selectedCouponDispatch]
  );

  const setCoupons = useCallback(
    (datas: CouponType[]) => {
      selectedCouponDispatch({
        type: "SET_COUPON",
        payload: {
          coupons: datas,
        },
      });
    },
    [selectedCouponDispatch]
  );

  return {
    addCoupon,
    removeCoupon,
    setCoupons,
  };
}

export default useCouponAction;
