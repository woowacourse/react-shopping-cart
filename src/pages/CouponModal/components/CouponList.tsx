import useCouponApplicabilityChecker from "@/hooks/coupon/useCouponApplicabilityChecker";
import CouponItem from "./Coupon";
import { Coupon, CouponWithApplicablity } from "@/types/coupon";
import { useRecoilValue } from "recoil";
import { totalItemsPriceSelector } from "@/recoil/orderInformation";

const CouponList = ({ couponList }: { couponList: Coupon[] }) => {
  const totalItemsPrice = useRecoilValue(totalItemsPriceSelector);
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const applicableCoupons: CouponWithApplicablity[] = [];
  const nonApplicableCoupons: CouponWithApplicablity[] = [];

  couponList.forEach((coupon) => {
    if (
      isCouponApplicable({
        coupon: coupon,
        price: totalItemsPrice,
        time: new Date(),
      })
    ) {
      applicableCoupons.push({ ...coupon, applicability: true });
    } else {
      nonApplicableCoupons.push({ ...coupon, applicability: false });
    }
  });

  const sortedCouponsWithApplicability = [
    ...applicableCoupons,
    ...nonApplicableCoupons,
  ];

  return (
    <>
      {sortedCouponsWithApplicability.map((coupon) => {
        return (
          <CouponItem
            key={coupon.id}
            coupon={coupon}
            disabled={!coupon.applicability}
          />
        );
      })}
    </>
  );
};

export default CouponList;
