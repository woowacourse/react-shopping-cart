import { useEffect } from "react";
import { useCouponManagerProvider } from "../../contexts/CouponManagerProvider";

export default function useResetCouponOnUnmount() {
  const { changeSelectedCoupon } = useCouponManagerProvider();

  useEffect(() => {
    return () => {
      changeSelectedCoupon([]);
    };
  }, [changeSelectedCoupon]);
}
