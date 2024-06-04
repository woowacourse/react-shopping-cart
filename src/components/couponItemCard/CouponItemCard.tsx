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

export interface CouponItemCardProps {
  coupon: Coupon;
}

export const CouponItemCard: React.FC<CouponItemCardProps> = ({ coupon }) => {
  const { id, description, expirationDate } = coupon;
  const { isCouponValid } = couponValidator();
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const { orderPrice } = useRecoilValue(cartSummarySelectorState);
  const [selectedCoupons, setSelectedCoupons] = useRecoilState(selectedCouponState);

  const isValid = isCouponValid(coupon);
  const isApplicable = isCouponApplicable(coupon, orderPrice);
  const isChecked = selectedCoupons.some((coupon) => coupon.id === id);
  const onChangeCouponCheck = () => {
    if (!isApplicable) return;
    setSelectedCoupons((prevSelectedCoupons) => {
      if (isChecked) {
        return prevSelectedCoupons.filter((selectedCoupon) => selectedCoupon.id !== id);
      } else if (prevSelectedCoupons.length < COUPON.MAX_SELECTABLE_COUPONS) {
        return [...prevSelectedCoupons, coupon];
      }
      return prevSelectedCoupons;
    });
  };

  return (
    <StyledCouponItemCard disabled={!isValid || !isApplicable}>
      <StyledCouponItemCardHeader>
        <CheckboxButton isChecked={isChecked} onCheck={onChangeCouponCheck} />
        <StyledCouponItemCardTitle>{description}</StyledCouponItemCardTitle>
      </StyledCouponItemCardHeader>
      <StyledCouponItemCardContentsWrapper>
        <StyledCouponItemCardContent>
          만료일: {formatDate(expirationDate)}
        </StyledCouponItemCardContent>
        <StyledCouponItemCardContent>{getAdditionalInfo(coupon)}</StyledCouponItemCardContent>
      </StyledCouponItemCardContentsWrapper>
    </StyledCouponItemCard>
  );
};
