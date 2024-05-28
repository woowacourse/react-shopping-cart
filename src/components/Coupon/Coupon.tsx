import CheckBox from '../CheckBox/CheckBox';

import Caution from '../../assets/caution.svg';
import * as C from './Coupon.style';
import { useRecoilState, useRecoilValue } from 'recoil';
import discountCalculator from '../../domain/discountCalculator';
import { calculateOrderPrice, checkedCartItems } from '../../recoil/selectors';
import { useEffect } from 'react';
import {
  applicableCouponList,
  applyCouponList,
  discountPrice,
} from '../../recoil/atoms';

interface Props {
  coupons: Coupon[];
}

export default function Coupon({ coupons }: Props) {
  const orderList = useRecoilValue(checkedCartItems);
  const { totalPrice, deliveryFee } = useRecoilValue(calculateOrderPrice);
  const applicableCoupons = useRecoilValue(applicableCouponList);
  const [applyCoupons, setApplyCoupons] = useRecoilState(applyCouponList);
  const [finalDiscountPrice, setFinalDiscountPrice] =
    useRecoilState(discountPrice);

  const applicableCouponIds = applicableCoupons.map((coupon) => {
    return coupon.id;
  });

  const applyCouponIds = applyCoupons.map((coupon) => {
    return coupon.id;
  });

  const handleClickCheckBox = (coupon: Coupon) => {
    if (applyCouponIds.length < 2 || applyCoupons.includes(coupon)) {
      setApplyCoupons((prev) => {
        const isCouponApplied = prev.some(
          (appliedCoupon) => appliedCoupon.id === coupon.id,
        );

        const updatedApplyCoupons = isCouponApplied
          ? prev.filter((appliedCoupon) => appliedCoupon.id !== coupon.id)
          : [...prev, coupon];

        return updatedApplyCoupons;
      });
    }
    return;
  };

  useEffect(() => {
    setFinalDiscountPrice(() => {
      const updateDiscountPrice = applyCoupons.reduce((acc, coupon) => {
        const discount = discountCalculator({
          coupon,
          totalPrice,
          orderList,
          deliveryFee,
        }).calculateDiscountAmount();
        return acc + discount!;
      }, 0);
      return updateDiscountPrice;
    });
  }, [applyCoupons]);

  return (
    <C.CouponStyle>
      <C.Notification>
        <img className="notification-img" src={Caution} />
        <span className="notification-text">
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </span>
      </C.Notification>
      <C.CouponList>
        {coupons.map((coupon) => {
          const expiration = coupon.expirationDate.split('-');

          return (
            <C.Item
              key={coupon.code}
              disabled={!applicableCouponIds.includes(coupon.id)}
            >
              <div className="coupon_checkbox-group">
                <CheckBox
                  isCheck={applyCouponIds.includes(coupon.id)}
                  onClick={() => handleClickCheckBox(coupon)}
                />
                <span className="coupon_name">{coupon.description}</span>
              </div>
              <span className="coupon_expiration">
                만료일: {expiration[0]}년 {expiration[1]}월 {expiration[2]}일
              </span>
              {coupon.minimumAmount && (
                <span>
                  최소 주문 금액: {coupon.minimumAmount.toLocaleString('ko-kr')}
                  원
                </span>
              )}
              {coupon.availableTime && (
                <span>
                  사용 가능 시간: 오전{' '}
                  {Number(coupon.availableTime.start.split(':')[0])}시부터{' '}
                  {Number(coupon.availableTime.end.split(':')[0])}시까지
                </span>
              )}
            </C.Item>
          );
        })}
      </C.CouponList>
    </C.CouponStyle>
  );
}
