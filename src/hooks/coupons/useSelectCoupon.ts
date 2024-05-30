import { startTransition } from "react";
import { useRecoilState } from "recoil";
import { couponSelectedState } from "../../recoil/atoms";

const useSelectCoupon = (id: number) => {
  const [isCouponSelected, setCouponSelected] = useRecoilState(
    couponSelectedState(id)
  );

  const toggleCouponSelected = () => {
    startTransition(() => {
      setCouponSelected((prev) => !prev);
    });
  };

  return {
    isCouponSelected,
    setCouponSelected,
    toggleCouponSelected,
  };
};

export default useSelectCoupon;
