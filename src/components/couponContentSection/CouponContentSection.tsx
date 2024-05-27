import { INFO_MESSAGES } from "../../constants";
import { CouponItemCardList } from "../couponItemCardList/CouponItemCardList";
import { InfoDescription } from "../infoDescription/InfoDescription";
import { StyledCouponContentSection } from "./CouponContentSection.styled";

export interface CouponContentSectionProps {
  onApplyButtonClick: () => void;
}

export const CouponContentSection: React.FC<CouponContentSectionProps> = ({
  onApplyButtonClick,
}) => {
  return (
    <StyledCouponContentSection>
      <InfoDescription text={INFO_MESSAGES.COUPON_USAGE_LIMIT} />
      <CouponItemCardList onApplyButtonClick={onApplyButtonClick} />
    </StyledCouponContentSection>
  );
};
