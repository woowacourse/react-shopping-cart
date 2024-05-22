import { Coupon } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import { CheckboxButton } from "../button";
import {
  StyledCouponItemCard,
  StyledCouponItemCardContent,
  StyledCouponItemCardContentsWrapper,
  StyledCouponItemCardHeader,
  StyledCouponItemCardTitle,
} from "./CouponItemCard.styled";

const getAdditionalInfo = (coupon: Coupon): string => {
  switch (coupon.discountType) {
    case "fixed":
      return `최소 주문 금액: ${coupon.minimumAmount?.toLocaleString()}원`;
    case "buyXgetY":
      return "";
    case "freeShipping":
      return `최소 주문 금액: ${coupon.minimumAmount?.toLocaleString()}원`;
    case "percentage":
      return `사용 가능 시간: ${formatTime(coupon.availableTime?.start || "")}부터 ${formatTime(coupon.availableTime?.end || "")}까지`;
    default:
      return "";
  }
};

export const CouponItemCard: React.FC<Coupon> = ({
  description,
  expirationDate,
  discountType,
  minimumAmount,
  buyQuantity,
  getQuantity,
  availableTime,
}) => {
  const isChecked = true;
  const onCheck = () => {};

  return (
    <StyledCouponItemCard>
      <StyledCouponItemCardHeader>
        <CheckboxButton isChecked={isChecked} onCheck={onCheck} />
        <StyledCouponItemCardTitle>{description}</StyledCouponItemCardTitle>
      </StyledCouponItemCardHeader>
      <StyledCouponItemCardContentsWrapper>
        <StyledCouponItemCardContent>
          만료일: {formatDate(expirationDate)}
        </StyledCouponItemCardContent>
        <StyledCouponItemCardContent>
          {getAdditionalInfo({
            id: "",
            description,
            expirationDate,
            discountType,
            minimumAmount,
            buyQuantity,
            getQuantity,
            availableTime,
          })}
        </StyledCouponItemCardContent>
      </StyledCouponItemCardContentsWrapper>
    </StyledCouponItemCard>
  );
};
