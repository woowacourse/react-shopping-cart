import { CouponType } from "./types";
import AvailableTime from "./AvailableTime";
import MinimumAmount from "./MinimumAmount";

interface CouponDetailsProps {
  coupon: CouponType;
}

function CouponDetails({ coupon }: CouponDetailsProps) {
  switch (coupon.discountType) {
    case "freeShipping":
      return <MinimumAmount minimumAmount={coupon.minimumAmount} />;

    case "percentage":
      return <AvailableTime availableTime={coupon.availableTime} />;

    default:
      return null;
  }
}

export default CouponDetails;
