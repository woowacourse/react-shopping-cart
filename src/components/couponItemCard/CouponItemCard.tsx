import { Coupon } from "../../types";
import { couponValidator } from "../../utils/couponValidator";
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
  id,
  code,
  description,
  expirationDate,
  discountType,
  minimumAmount,
  buyQuantity,
  getQuantity,
  availableTime,
}) => {
  const { isCouponValid } = couponValidator();
  const isValid = isCouponValid({ id, code, description, expirationDate, discountType });

  const isChecked = true;
  const onCheck = () => {};

  return (
    <StyledCouponItemCard disabled={!isValid}>
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
