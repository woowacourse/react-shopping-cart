import { INFO_MESSAGES } from "../../constants";
import { ApplySelectedCouponButton } from "../button";
import { CouponItemCardList } from "../couponItemCardList/CouponItemCardList";
import { InfoDescription } from "../infoDescription/InfoDescription";
import { StyledCouponContentSection } from "./CouponContentSection.styled";

export const CouponContentSection = () => {
  return (
    <StyledCouponContentSection>
      <InfoDescription text={INFO_MESSAGES.COUPON_USAGE_LIMIT} />
      <CouponItemCardList />
      <ApplySelectedCouponButton onClick={() => {}} totalDiscountPrice="6000" />
    </StyledCouponContentSection>
  );
};
