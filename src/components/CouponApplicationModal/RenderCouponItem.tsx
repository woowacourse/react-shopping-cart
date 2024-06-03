import { CouponType } from '../type';
import CouponItem from './CouponItem';
import * as Styled from './style';

/**
 *
 * 쿠폰 목록에 따른 CouponItem 렌더링
 */
const RenderCouponItem = (coupon: CouponType, available: boolean) => {
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
};

export default RenderCouponItem;
