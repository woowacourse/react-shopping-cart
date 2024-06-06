import BaseButton from "../baseButton/baseButton";
import {
  StyledApplySelectedCouponButton,
  StyledApplySelectedCouponButtonWrapper,
} from "./ApplySelectedCouponButton.styled";

export interface ApplySelectedCouponButtonProps {
  onClick: () => void;
  totalDiscountPrice: string;
}

export const ApplySelectedCouponButton: React.FC<ApplySelectedCouponButtonProps> = ({
  onClick = () => {},
  totalDiscountPrice,
}) => {
  const text = `총 ${totalDiscountPrice}원 할인 쿠폰 사용하기`;

  return (
    <StyledApplySelectedCouponButtonWrapper>
      <BaseButton>
        <StyledApplySelectedCouponButton onClick={onClick}>{text}</StyledApplySelectedCouponButton>
      </BaseButton>
    </StyledApplySelectedCouponButtonWrapper>
  );
};
