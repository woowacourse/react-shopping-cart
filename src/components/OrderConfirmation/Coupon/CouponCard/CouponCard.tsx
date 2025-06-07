import { Coupon, CouponType } from "../../../../type/Coupons";
import * as Styled from "./CouponCard.style";
import CommonCoupon from "./SubCouponCards/CommonCoupon/CommonCoupon";
import FixedDiscountCoupon from "./SubCouponCards/FixedDiscountCoupon/FixedDiscountCoupon";
import FreeShippingCoupon from "./SubCouponCards/FreeShippingCoupon/FreeShippingCoupon";

interface CouponCardProps {
  coupon: Coupon;
  isSelected: boolean;
  handleSelectCoupon: (id: number) => void;
}

function CouponCard({
  coupon,
  isSelected,
  handleSelectCoupon,
}: CouponCardProps) {
  const renderSpecificCoupon = () => {
    switch (coupon.discountType) {
      case CouponType.FIXED:
        return <FixedDiscountCoupon coupon={coupon} />;
      case CouponType.FREE_SHIPPING:
        return <FreeShippingCoupon coupon={coupon} />;

      case CouponType.BUY_X_GET_Y:
      default:
        return null;
    }
  };

  return (
    <li>
      <Styled.Container>
        <CommonCoupon
          coupon={coupon}
          isSelected={true}
          handleSelectCoupon={() => {}}
        />
        {renderSpecificCoupon()}
      </Styled.Container>
    </li>
  );
}

export default CouponCard;
