import { Coupon } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { getAdditionalInfo } from "../../utils/getCouponAdditionalInfo";
import { CheckboxButton } from "../button";
import {
  StyledCouponItemCard,
  StyledCouponItemCardContent,
  StyledCouponItemCardContentsWrapper,
  StyledCouponItemCardHeader,
  StyledCouponItemCardTitle,
} from "./CouponItemCard.styled";

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
