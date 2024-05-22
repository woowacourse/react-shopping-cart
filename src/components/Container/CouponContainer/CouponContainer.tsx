import { Coupon } from '../../../types/Coupon.type';
import { formatExpirationDate, formatMinimumAmount } from '../../../utils/formatStrings';
import CheckButton from '../../Button/CheckButton/CheckButton';
import * as S from './CouponContainer.style';

interface CouponContainerProps {
  coupon: Coupon;
}

function CouponContainer({ coupon }: CouponContainerProps) {
  return (
    <S.Layout>
      <S.CheckButtonAndDescription>
        <CheckButton isChecked={false} />
        <h2>{coupon.description}</h2>
      </S.CheckButtonAndDescription>

      <p>{formatExpirationDate(coupon.expirationDate)}</p>
      {coupon.minimumAmount && <p>{formatMinimumAmount(coupon.minimumAmount)}</p>}
    </S.Layout>
  );
}

export default CouponContainer;
