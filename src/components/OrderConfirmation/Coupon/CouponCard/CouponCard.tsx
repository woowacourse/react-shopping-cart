import { Coupon } from "../../../../type/Coupons";
import * as Styled from "./CouponCard.style";
import CommonCoupon from "./SubCouponCards/CommonCoupon/CommonCoupon";

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
  return (
    <li>
      <Styled.Container>
        <CommonCoupon
          coupon={coupon}
          isSelected={true}
          handleSelectCoupon={() => {}}
        />
      </Styled.Container>
    </li>
  );
}

export default CouponCard;
