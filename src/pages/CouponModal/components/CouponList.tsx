import { CouponWithApplicablity } from "../CouponModal";
import CouponItem from "./Coupon";

const CouponList = ({
  couponsWithApplicability,
}: {
  couponsWithApplicability: CouponWithApplicablity[];
}) => {
  return (
    <>
      {couponsWithApplicability.map((oneCoupon) => {
        const { coupon, applicability } = oneCoupon;
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
