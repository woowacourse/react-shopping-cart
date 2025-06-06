import * as S from "./CouponModalContent.styles";
import CouponItem from "../../../features/couponItem/CouponItem";
import Button from "../../button/Button";
import type { CouponType } from "../../../../types/response";

interface CouponModalContentProps {
  couponList: CouponType[];
  validCouponList: CouponType[];
  isCheckedCoupons: Map<number, CouponType>;
  toggleCheckedCoupon: (couponInfo: CouponType) => void;
}

const CouponModalContent = ({
  couponList,
  validCouponList,
  isCheckedCoupons,
  toggleCheckedCoupon,
}: CouponModalContentProps) => {
  return (
    <div css={S.couponModalContentContainer}>
      {couponList.map((coupon) => (
        <CouponItem
          key={coupon.id}
          description={coupon.description}
          dueDate={coupon.expirationDate}
          minimumAmount={
            "minimumAmount" in coupon ? coupon.minimumAmount : undefined
          }
          isValid={validCouponList.includes(coupon)}
          isSelected={isCheckedCoupons.has(coupon.id)}
          onSelectCoupon={() => toggleCheckedCoupon(coupon)}
        />
      ))}
      <Button size="large" color="black">
        총 ${6000}원 할인 쿠폰 사용하기
      </Button>
    </div>
  );
};

export default CouponModalContent;
