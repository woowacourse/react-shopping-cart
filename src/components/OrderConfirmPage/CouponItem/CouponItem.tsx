import useCouponApplicable from '../../../hooks/useCouponApplicable';
import CheckBox from '../../common/CheckBox/CheckBox';
import type { Coupon } from '../../../types/Coupon.type';
import { formatExpirationDate, formatAvailableTime } from '../../../utils/format';
import * as S from './CouponItems.style';

interface CouponItemProps {
  coupon: Coupon;
  isSelected: boolean;
  isMaxLength: boolean;
  handleSelectedCoupons: (newCoupon: Coupon) => void;
}

function CouponItem({ coupon, isSelected, isMaxLength, handleSelectedCoupons }: CouponItemProps) {
  const { code, description, expirationDate, minimumAmount, availableTime } = coupon;
  const { isCouponApplicable } = useCouponApplicable();

  const isActive = isCouponApplicable(coupon) && (!isMaxLength || isSelected);

  const handleIsSelected = () => handleSelectedCoupons(coupon);

  return (
    <S.Layout $isApplicable={isActive} aria-disabled={!isActive}>
      <S.CouponTitle>
        <CheckBox id={code} isChecked={isSelected} disabled={!isActive} onChange={handleIsSelected} />
        <p>{description}</p>
      </S.CouponTitle>
      <S.CouponDetail>
        <p>만료일: {formatExpirationDate(expirationDate)}</p>
        {minimumAmount && <p>최소 주문 금액: {minimumAmount.toLocaleString()}원</p>}
        {availableTime && (
          <p>
            사용 가능 시간: {formatAvailableTime(availableTime?.start)}부터 {formatAvailableTime(availableTime?.end)}
            까지
          </p>
        )}
      </S.CouponDetail>
    </S.Layout>
  );
}

export default CouponItem;
