import { useRecoilState, useRecoilValue } from "recoil";
import { COUPON } from "../../constants";
import { useCouponApplicabilityChecker } from "../../hooks/useCouponApplicabilityChecker";
import { selectedCouponState } from "../../recoil/atoms/atoms";
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

export interface CouponItemCardProps extends Coupon {
  onApplyButtonClick: () => void;
}

export const CouponItemCard: React.FC<CouponItemCardProps> = ({
  id,
  code,
  description,
  expirationDate,
  discountType,
  minimumAmount,
  buyQuantity,
  getQuantity,
  availableTime,
  onApplyButtonClick,
}) => {
  const { isCouponValid } = couponValidator();
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const { orderPrice } = useRecoilValue(cartSummarySelectorState);
  const [selectedCoupons, setSelectedCoupons] = useRecoilState(selectedCouponState);

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

  const isChecked = selectedCoupons.some((coupon) => coupon.id === id);
  const onCheck = () => {
    if (!isApplicable) return;

    setSelectedCoupons((prevSelectedCoupons) => {
      if (isChecked) {
        return prevSelectedCoupons.filter((coupon) => coupon.id !== id);
      } else if (prevSelectedCoupons.length < COUPON.MAX_SELECTABLE_COUPONS) {
        onApplyButtonClick();
        return [...prevSelectedCoupons, { id, code, description, expirationDate, discountType }];
      }
      return prevSelectedCoupons;
    });
  };

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
