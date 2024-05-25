import { useRecoilValue } from 'recoil';
import { fetchedCouponsSelector } from '../../recoil/fetch';
import Caption from '../common/Caption/Caption';
import * as Styled from './style';
import useCheckCoupon from '../../hooks/useCheckCoupon';
import CouponItem from './CouponItem';
import { useEffect } from 'react';
import { CouponType } from '../type';
import useCouponAvailable from '../../hooks/useCouponAvailable';

interface CouponProp {
  applyCoupon: (coupons: CouponType[]) => void;
}
const Coupons = ({ applyCoupon }: CouponProp) => {
  const coupons = useRecoilValue(fetchedCouponsSelector);
  const { selectCoupon, couponSelected, haveDoubleCouponApplied } =
    useCheckCoupon();
  const { isCouponAvailable } = useCouponAvailable();

  const availableCouponsFiltered = coupons.filter((coupon) => {
    return isCouponAvailable(coupon);
  });
  const disableCouponsFiltered = coupons.filter((coupon) => {
    return !isCouponAvailable(coupon);
  });

  useEffect(() => {
    const couponsChecked = coupons.filter((coupon: CouponType) => {
      return couponSelected[coupon.code];
    });
    applyCoupon(couponsChecked);
  }, [couponSelected]);
  //TODO: 이 부분 훅으로 빼기

  return (
    <Styled.CouponContainer>
      <Caption message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
      {availableCouponsFiltered.map((coupon) => {
        //TODO: 여기 리팩토링,,
        return (
          <Styled.CouponItemBox key={coupon.id}>
            <Styled.CouponDivider />
            <CouponItem
              couponCode={coupon.code}
              expirationDate={coupon.expirationDate}
              description={coupon.description}
              selectCoupon={selectCoupon}
              disable={false || haveDoubleCouponApplied(coupon.code)}
              minimumAmount={coupon.minimumAmount}
              availableTime={coupon.availableTime}
            />
          </Styled.CouponItemBox>
        );
      })}

      {disableCouponsFiltered.map((coupon: CouponType) => {
        return (
          <Styled.CouponItemBox>
            <Styled.CouponDivider />
            <CouponItem
              key={coupon.id}
              couponCode={coupon.code}
              expirationDate={coupon.expirationDate}
              description={coupon.description}
              selectCoupon={selectCoupon}
              disable={true}
              minimumAmount={coupon.minimumAmount}
              availableTime={coupon.availableTime}
            />
          </Styled.CouponItemBox>
        );
      })}
    </Styled.CouponContainer>
  );
};

export default Coupons;
