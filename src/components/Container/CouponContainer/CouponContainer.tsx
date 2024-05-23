import { useRecoilState } from 'recoil';
import { selectedCouponListSelector } from '../../../recoil/Coupon/selectors/selectedCouponListSelector';
import { Coupon } from '../../../types/Coupon.type';
import { formatExpirationDate, formatMinimumAmount, formatTimeRange } from '../../../utils/formatStrings';
import CheckButton from '../../Button/CheckButton/CheckButton';
import * as S from './CouponContainer.style';

interface CouponContainerProps {
  coupon: Coupon;
}

function CouponContainer({ coupon }: CouponContainerProps) {
  const [isSelected, setIsSelected] = useRecoilState(selectedCouponListSelector(coupon));

  const handleIsSelected = () => {
    setIsSelected(isSelected);
  };

  return (
    <S.Layout>
      <S.CheckButtonAndDescription>
        <CheckButton isChecked={isSelected} onClick={handleIsSelected} />
        <h2>{coupon.description}</h2>
      </S.CheckButtonAndDescription>

      <p>{formatExpirationDate(coupon.expirationDate)}</p>
      {coupon.minimumAmount && <p>{formatMinimumAmount(coupon.minimumAmount)}</p>}
      {coupon.availableTime && <p>{formatTimeRange(coupon.availableTime)}</p>}
    </S.Layout>
  );
}

export default CouponContainer;
