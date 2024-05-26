import { useRecoilValue } from "recoil";
import { useCouponApplicabilityChecker } from "../../hooks/useCouponApplicabilityChecker";
import { cartSummarySelectorState } from "../../recoil/selector/selector";
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
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const { orderPrice } = useRecoilValue(cartSummarySelectorState);

  const isValid = isCouponValid({ id, code, description, expirationDate, discountType });

  const isApplicable = isCouponApplicable(
    {
      id,
      code,
      description,
      expirationDate,
      discountType,
      minimumAmount,
      buyQuantity,
      getQuantity,
      availableTime,
    },
    orderPrice
  );

  const isChecked = true;
  const onCheck = () => {};

  return (
    <StyledCouponItemCard disabled={!isValid || !isApplicable}>
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
