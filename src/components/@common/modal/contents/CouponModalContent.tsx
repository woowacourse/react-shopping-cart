import * as S from "./CouponModalContent.styles";
import CouponItem from "../../../features/couponItem/CouponItem";
import Button from "../../button/Button";
import type { CouponType } from "../../../../types/response";
import {
  COUPON_LIMIT_MESSAGE,
  NO_VALID_COUPON_MESSAGE,
} from "../../../../constants/systemMessages";
import { isValid } from "../../../../domains/coupon/validateCoupon";
import { InfoMessage } from "../../infoMessage/InfoMessage";

interface CouponModalContentProps {
  totalDiscountPrice: number;
  bogoQuantity: number;
  couponList: CouponType[];
  validCouponList: CouponType[];
  checkedCoupons: Map<number, CouponType>;
  toggleCheckedCoupon: (couponInfo: CouponType) => void;
  onModalClose: () => void;
}

const CouponModalContent = (props: CouponModalContentProps) => {
  const {
    totalDiscountPrice,
    bogoQuantity,
    couponList,
    validCouponList,
    checkedCoupons,
    toggleCheckedCoupon,
    onModalClose,
  } = props;

  const message =
    validCouponList.length === 0
      ? NO_VALID_COUPON_MESSAGE
      : COUPON_LIMIT_MESSAGE;
  return (
    <div css={S.couponModalContentContainer}>
      <InfoMessage message={message} />
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
          isValid={isValid(validCouponList, checkedCoupons, coupon.id)}
          isSelected={checkedCoupons.has(coupon.id)}
          onSelectCoupon={() => toggleCheckedCoupon(coupon)}
        />
      ))}
      <Button size="large" color="black" onClick={onModalClose}>
        총 {totalDiscountPrice.toLocaleString()}원 할인 / {bogoQuantity}개 추가
      </Button>
    </div>
  );
};

export default CouponModalContent;
