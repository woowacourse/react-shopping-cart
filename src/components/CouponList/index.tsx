import { Coupon } from "../../types";
import CouponItem from "../CouponItem";

interface CouponListProps {
  coupons: Coupon[];
}

const CouponList: React.FC<CouponListProps> = ({ coupons }) => {
  return (
    <>
      {coupons.map((coupon: Coupon) => (
        <CouponItem coupon={coupon} key={coupon.id} />
      ))}
    </>
  );
};

export default CouponList;
