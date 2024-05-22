import { StyledCouponButton } from "./CouponButton.styled";

export interface CouponButtonProps {
  onClick: () => void;
}

export const CouponButton: React.FC<CouponButtonProps> = ({ onClick = () => {} }) => {
  return <StyledCouponButton onClick={onClick}>쿠폰 적용</StyledCouponButton>;
};
