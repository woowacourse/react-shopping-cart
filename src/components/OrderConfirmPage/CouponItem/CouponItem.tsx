import CheckBox from '../../common/CheckBox/CheckBox';
import type { Coupon } from '../../../types/Coupon.type';

import * as S from './CouponItems.style';

interface CouponItemProps {
  coupon: Coupon;
}

function CouponItem({ coupon }: CouponItemProps) {
  const { code, description, expirationDate, minimumAmount, availableTime } = coupon;

  return (
    <S.Layout>
      <S.CouponTitle>
        <CheckBox id={code} isChecked={true} />
        <p>{description}</p>
      </S.CouponTitle>
      <S.CouponDetail>
        <p>만료일: {expirationDate}</p>
        {minimumAmount && <p>최소 주문 금액: {minimumAmount}</p>}
        {availableTime && (
          <p>
            사용 가능 시간: {availableTime?.start}부터 {availableTime?.end}까지
          </p>
        )}
      </S.CouponDetail>
    </S.Layout>
  );
}

export default CouponItem;
