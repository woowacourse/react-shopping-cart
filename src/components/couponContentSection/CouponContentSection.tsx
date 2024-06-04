import { INFO_MESSAGES } from "../../constants";
import { useFetchCoupons } from "../../hooks/useFetchCoupons";
import { CouponItemCard } from "../couponItemCard/CouponItemCard";
import { InfoDescription } from "../infoDescription/InfoDescription";
import {
  StyledCouponContentSection,
  StyledCouponItemCardList,
} from "./CouponContentSection.styled";

export const CouponContentSection: React.FC = () => {
  const coupons = useFetchCoupons();

  return (
    <StyledCouponContentSection>
      <InfoDescription text={INFO_MESSAGES.COUPON_USAGE_LIMIT} />
      <StyledCouponItemCardList>
        {coupons.map((coupon) => (
          <CouponItemCard key={coupon.id} coupon={coupon} />
        ))}
      </StyledCouponItemCardList>
    </StyledCouponContentSection>
  );
};
