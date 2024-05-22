import BaseButton from "../baseButton/baseButton";
import { StyledCouponButton } from "./CouponButton.styled";

export interface CouponButtonProps {
  onClick: () => void;
}

export const CouponButton: React.FC<CouponButtonProps> = ({ onClick = () => {} }) => {
  return (
    <BaseButton>
      <StyledCouponButton onClick={onClick}>쿠폰 적용</StyledCouponButton>
    </BaseButton>
  );
};
