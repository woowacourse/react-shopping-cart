import { Coupon } from "../../../../type/Coupons";
import * as Styled from "./CouponCard.style";

interface CouponCardProps {
  coupon: Coupon;
}

function CouponCard({ coupon }: CouponCardProps) {
  return (
    <li>
      <Styled.Container></Styled.Container>
    </li>
  );
}

export default CouponCard;
