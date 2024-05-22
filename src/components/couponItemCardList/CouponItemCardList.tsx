import { coupons } from "../../constants/coupons";
import { CouponItemCard } from "../couponItemCard/CouponItemCard";
import { StyledCouponItemCardList } from "./CouponItemCardList.styled";

export const CouponItemCardList = () => {
  return (
    <StyledCouponItemCardList>
      {coupons.map((coupon, index) => (
        <CouponItemCard
          key={index}
          title={coupon.title}
          expiryDate={coupon.expiryDate}
          additionalInfo={coupon.additionalInfo}
        />
      ))}
    </StyledCouponItemCardList>
  );
};
