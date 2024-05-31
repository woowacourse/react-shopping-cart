import Caption from '../common/Caption/Caption';
import * as Styled from './style';
import { CouponType } from '../type';
import RenderCouponItem from './RenderCouponItem';

interface CouponProp {
  availableCouponsFiltered: CouponType[];
  disableCouponsFiltered: CouponType[];
}
const Coupons = ({
  availableCouponsFiltered,
  disableCouponsFiltered,
}: CouponProp) => {
  return (
    <Styled.CouponContainer>
      <Caption message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      {availableCouponsFiltered.map((coupon) => RenderCouponItem(coupon, true))}

      {disableCouponsFiltered.map((coupon) => RenderCouponItem(coupon, false))}
    </Styled.CouponContainer>
  );
};

export default Coupons;
