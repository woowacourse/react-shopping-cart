import { useRecoilValue } from "recoil";

import Coupon from "../Coupon/Coupon";

import InformationCircleDescription from "@/components/InformationCircleDescription/InformationCircleDescription";
import { couponsState } from "@/store/atom/atoms";

const CouponList = () => {
  const coupons = useRecoilValue(couponsState);

  return (
    <div>
      <InformationCircleDescription>쿠폰은 최대 2개까지 사용할 수 있습니다.</InformationCircleDescription>
      {coupons.map((coupon) => (
        <Coupon couponInfo={coupon} key={coupon.id} />
      ))}
    </div>
  );
};

export default CouponList;
