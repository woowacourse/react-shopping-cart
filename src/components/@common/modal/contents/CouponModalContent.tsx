import * as S from "./CouponModalContent.styles";
import CouponItem from "../../../features/couponItem/CouponItem";
import Button from "../../button/Button";
import type { CouponType } from "../../../../types/response";
import { COUPON_LIMIT } from "../../../../constants/systemConstants";
import infoIcon from "/public/icon/ic_info.svg";
import {
  InfoMessageContainer,
  Description,
} from "../../../../styles/@common/title/Title.styles";

interface CouponModalContentProps {
  totalDiscountPrice: number;
  couponList: CouponType[];
  validCouponList: CouponType[];
  isCheckedCoupons: Map<number, CouponType>;
  toggleCheckedCoupon: (couponInfo: CouponType) => void;
  onModalClose: () => void;
}

const CouponModalContent = ({
  totalDiscountPrice,
  couponList,
  validCouponList,
  isCheckedCoupons,
  toggleCheckedCoupon,
  onModalClose,
}: CouponModalContentProps) => {
  const isMaxCouponSelected = isCheckedCoupons.size >= COUPON_LIMIT;
  const isValid = (coupon: CouponType) =>
    (validCouponList.includes(coupon) && !isMaxCouponSelected) ||
    isCheckedCoupons.has(coupon.id);
  const isSelected = (id: number) => isCheckedCoupons.has(id);

  return (
    <div css={S.couponModalContentContainer}>
      <div css={InfoMessageContainer}>
        <img src={infoIcon} alt="info" />
        <p css={Description}>{COUPON_LIMIT_MESSAGE}</p>
      </div>
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
      <Button size="large" color="black" onClick={onModalClose}>
        총 {totalDiscountPrice}원 할인 쿠폰 사용하기
      </Button>
    </div>
  );
};

export default CouponModalContent;
