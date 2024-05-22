import { CheckboxButton } from "../button";
import {
  StyledCouponItemCard,
  StyledCouponItemCardContent,
  StyledCouponItemCardContentsWrapper,
  StyledCouponItemCardHeader,
  StyledCouponItemCardTitle,
} from "./CouponItemCard.styled";

interface CouponItemCardProps {
  title: string;
  expiryDate: string;
  additionalInfo: string;
}

export const CouponItemCard: React.FC<CouponItemCardProps> = ({
  title,
  expiryDate,
  additionalInfo,
}) => {
  const isChecked = true;
  const onCheck = () => {};

  return (
    <StyledCouponItemCard>
      <StyledCouponItemCardHeader>
        <CheckboxButton isChecked={isChecked} onCheck={onCheck} />
        <StyledCouponItemCardTitle>{title}</StyledCouponItemCardTitle>
      </StyledCouponItemCardHeader>
      <StyledCouponItemCardContentsWrapper>
        <StyledCouponItemCardContent>{expiryDate}</StyledCouponItemCardContent>
        <StyledCouponItemCardContent>{additionalInfo}</StyledCouponItemCardContent>
      </StyledCouponItemCardContentsWrapper>
    </StyledCouponItemCard>
  );
};
