import { useFetchCoupons } from "../../hooks/useFetchCoupons";
import { CouponItemCard } from "../couponItemCard/CouponItemCard";
import { StyledCouponItemCardList } from "./CouponItemCardList.styled";

export interface CouponItemCardListProps {
  onApplyButtonClick: () => void;
}

export const CouponItemCardList: React.FC<CouponItemCardListProps> = ({ onApplyButtonClick }) => {
  const coupons = useFetchCoupons();

  return (
    <StyledCouponItemCardList>
      {coupons.map((coupon) => (
        <CouponItemCard key={coupon.id} {...coupon} onApplyButtonClick={onApplyButtonClick} />
      ))}
    </StyledCouponItemCardList>
  );
};
