import { useRecoilValue } from "recoil";
import { couponsState } from "../../recoil/atoms";

// import { mockCoupons } from "../../mocks";

const useCouponFinder = () => {
  const coupons = useRecoilValue(couponsState);
  //   const coupons = mockCoupons;

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};

export default useCouponFinder;
