import { useFetchCoupons } from "../../hooks/useFetchCoupons";
import { CouponItemCard } from "../couponItemCard/CouponItemCard";
import { StyledCouponItemCardList } from "./CouponItemCardList.styled";

export const CouponItemCardList = () => {
  const coupons = useFetchCoupons();

  return (
    <StyledCouponItemCardList>
      {coupons.map((coupon) => (
        <CouponItemCard
          key={coupon.id}
          id={coupon.id}
          code={coupon.code}
          description={coupon.description}
          expirationDate={coupon.expirationDate}
          discount={coupon.discount}
          discountType={coupon.discountType}
          minimumAmount={coupon.minimumAmount}
          buyQuantity={coupon.buyQuantity}
          getQuantity={coupon.getQuantity}
          availableTime={coupon.availableTime}
        />
      ))}
    </StyledCouponItemCardList>
  );
};
