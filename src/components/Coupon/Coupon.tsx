import CheckBox from '../CheckBox/CheckBox';

import Caution from '../../assets/caution.svg';
import * as C from './Coupon.style';

export default function Coupon({ coupons }: { coupons: Coupon[] }) {
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
            // TODO: 쿠폰 사용이 불가능할 때 disabled 추가
            <C.Item key={coupon.code}>
              <div className="coupon_checkbox-group">
                {/* TODO: selector에 couponCheckbox 만들기 */}
                <CheckBox isCheck={false} onClick={() => {}} />
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
