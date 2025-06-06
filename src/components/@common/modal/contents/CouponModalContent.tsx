import * as S from "./CouponModalContent.styles";
import CouponItem from "../../../features/couponItem/CouponItem";
import type { CouponType } from "../../../../types/response";
import Button from "../../button/Button";

interface CouponModalContentProps {
  couponList: CouponType[];
}

const CouponModalContent = ({ couponList }: CouponModalContentProps) => {
  return (
    <div css={S.couponModalContentContainer}>
      {couponList.map((coupon) => (
        <CouponItem
          key={coupon.id}
          name={coupon.description}
          dueDate={coupon.expirationDate}
          minimumOrderPrice={coupon.minimumAmount}
          isSelected={true}
        />
      ))}
      <Button size="large" color="black">
        총 ${6000}원 할인 쿠폰 사용하기
      </Button>
    </div>
  );
};

export default CouponModalContent;
