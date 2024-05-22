import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCouponListSelector, isCouponListMaxLength } from '../../../recoil/Coupon/selectors/selectors';
import useCouponApplicable from '../../hooks/useCouponApplicable';
import CheckBox from '../../common/CheckBox/CheckBox';
import type { Coupon } from '../../../types/Coupon.type';

import * as S from './CouponItems.style';

interface CouponItemProps {
  coupon: Coupon;
}

function CouponItem({ coupon }: CouponItemProps) {
  const { code, description, expirationDate, minimumAmount, availableTime } = coupon;
  const { isCouponApplicable } = useCouponApplicable();

  const [isSelected, setIsSelected] = useRecoilState(selectedCouponListSelector(coupon));
  const isMaxLength = useRecoilValue(isCouponListMaxLength);

  const handleIsActive = () => {
    if (!isCouponApplicable(coupon)) {
      return false;
    }

    return !isMaxLength || isSelected;
  };

  const isActive = handleIsActive();

  const handleIsSelected = () => setIsSelected(isSelected);

  return (
    <S.Layout $isApplicable={isActive}>
      <S.CouponTitle>
        <CheckBox id={code} isChecked={isSelected} disabled={!isActive} onChange={handleIsSelected} />
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
