import * as S from "./CouponModalContent.styles";
import CouponItem from "../../../features/couponItem/CouponItem";
import Button from "../../button/Button";
import type { CouponType } from "../../../../types/response";
import { COUPON_LIMIT } from "../../../../constants/systemConstants";

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
  const isMaxCouponSelected = isCheckedCoupons.size >= COUPON_LIMIT;
  const isValid = (coupon: CouponType) =>
    (validCouponList.includes(coupon) && !isMaxCouponSelected) ||
    isCheckedCoupons.has(coupon.id);
  const isSelected = (id: number) => isCheckedCoupons.has(id);

  return (
    <div css={S.couponModalContentContainer}>
      {couponList.map((coupon) => (
        <CouponItem
          key={coupon.id}
          description={coupon.description}
          couponInfo={{
            dueDate: coupon.expirationDate,
            minimumAmount:
              "minimumAmount" in coupon ? coupon.minimumAmount : undefined,
            availableTime:
              "availableTime" in coupon ? coupon.availableTime : undefined,
          }}
          isValid={isValid(coupon)}
          isSelected={isSelected(coupon.id)}
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
