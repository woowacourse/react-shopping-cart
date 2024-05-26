import Caption from '../common/Caption/Caption';
import * as Styled from './style';
import CouponItem from './CouponItem';
import { CouponType } from '../type';

interface CouponProp {
  availableCouponsFiltered: CouponType[];
  disableCouponsFiltered: CouponType[];
}
const Coupons = ({
  availableCouponsFiltered,
  disableCouponsFiltered,
}: CouponProp) => {
  /**
   *
   * 쿠폰 목록에 따른 CouponItem 렌더링
   */
  function renderCouponItem(coupon: CouponType, available: boolean) {
    return (
      <Styled.CouponItemBox key={coupon.id}>
        <Styled.CouponDivider />
        <CouponItem
          expirationDate={coupon.expirationDate}
          description={coupon.description}
          couponId={coupon.id}
          available={available}
          minimumAmount={coupon.minimumAmount}
          availableTime={coupon.availableTime}
        />
      </Styled.CouponItemBox>
    );
  }

  return (
    <Styled.CouponContainer>
      <Caption message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      {availableCouponsFiltered.map((coupon) => renderCouponItem(coupon, true))}

      {disableCouponsFiltered.map((coupon) => renderCouponItem(coupon, false))}
    </Styled.CouponContainer>
  );
};

export default Coupons;
