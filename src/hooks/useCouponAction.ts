import { useSelectedCouponDispatch } from "../stores/SelectedCouponContext";
import { CouponType } from "../types/types";

function useCouponAction() {
  const selectedCouponDispatch = useSelectedCouponDispatch();

  const addCoupon = (data: CouponType) => {
    selectedCouponDispatch({
      type: "ADD_COUPON",
      payload: { coupon: data },
    });
  };

  const removeCoupon = (data: CouponType) => {
    selectedCouponDispatch({
      type: "REMOVE_COUPON",
      payload: { coupon: data },
    });
  };

  const setCoupons = (datas: CouponType[]) => {
    selectedCouponDispatch({
      type: "SET_COUPON",
      payload: {
        coupons: datas,
      },
    });
  };

  return {
    addCoupon,
    removeCoupon,
    setCoupons,
  };
}

export default useCouponAction;
