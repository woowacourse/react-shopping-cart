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
import { COUPON_LIMIT_MESSAGE } from "../../../../constants/systemMessages";

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

  const isMaxCouponSelected = checkedCoupons.size >= COUPON_LIMIT;
  const isValid = (coupon: CouponType) =>
    (validCouponList.includes(coupon) && !isMaxCouponSelected) ||
    checkedCoupons.has(coupon.id);
  const isSelected = (id: number) => checkedCoupons.has(id);

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
        총 {totalDiscountPrice}원 할인 / {bogoQuantity}개 추가
      </Button>
    </div>
  );
};

export default CouponModalContent;
