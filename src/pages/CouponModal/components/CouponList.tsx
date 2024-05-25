import useCouponApplicabilityChecker from "@/hooks/coupon/useCouponApplicabilityChecker";
import CouponItem from "./Coupon";
import { CouponWithApplicablity } from "../CouponModal";
import { Coupon } from "@/types/coupon";
import { useRecoilValue } from "recoil";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";

const CouponList = ({ couponList }: { couponList: Coupon[] }) => {
  const totalItemsPrice = useRecoilValue(totalOrderPriceSelector);
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const applicableCoupons: CouponWithApplicablity[] = [];
  const nonApplicableCoupons: CouponWithApplicablity[] = [];

  couponList.forEach((coupon) => {
    if (isCouponApplicable(coupon, totalItemsPrice, new Date())) {
      applicableCoupons.push({ coupon: coupon, applicability: true });
    } else {
      nonApplicableCoupons.push({ coupon: coupon, applicability: false });
    }
  });

  const sortedCouponsWithApplicability = [
    ...applicableCoupons,
    ...nonApplicableCoupons,
  ];

  return (
    <>
      {sortedCouponsWithApplicability.map((couponWithApplicability) => {
        const { coupon, applicability } = couponWithApplicability;
        return (
          <CouponItem
            key={coupon.id}
            coupon={coupon}
            disabled={!applicability}
          />
        );
      })}
    </>
  );
};

export default CouponList;
