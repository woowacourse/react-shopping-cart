import CheckButton from '../common/CheckButton/CheckButton';
import * as Styled from './style';
import { AvailableType } from '../type';
import { convertToTimeFormat } from '../util/convertToTimeFormat';
import { koMoneyFormat } from '../util/koMoneyFormat';
import { convertToDateFormat } from '../util/convertToDateFormat';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  couponSelectedState,
  isDoubleCouponAppliedSelector,
} from '../../recoil/coupons';

interface CouponItemProp {
  expirationDate: string;
  description: string;
  available: boolean;
  minimumAmount?: number;
  availableTime?: AvailableType;
  couponId: number;
}

const CouponItem = ({
  description,
  expirationDate,
  available,
  minimumAmount,
  availableTime,
  couponId,
}: CouponItemProp) => {
  const [couponSelected, setCouponSelected] = useRecoilState(
    couponSelectedState(couponId),
  );
  const isDoubleCouponApplied = useRecoilValue(
    isDoubleCouponAppliedSelector(couponId),
  );

  const handleClickCoupon = () => {
    setCouponSelected((prop) => !prop);
  };

  return (
    <Styled.CouponItem disabled={!available || isDoubleCouponApplied}>
      <Styled.CouponItemTitle>
        <CheckButton
          isSelected={couponSelected}
          setIsSelected={handleClickCoupon}
        />
        <p>{description}</p>
      </Styled.CouponItemTitle>
      <div>만료일: {convertToDateFormat(expirationDate)}</div>
      {minimumAmount && (
        <div>{`최소 주문 금액: ${koMoneyFormat(minimumAmount)}`}</div>
      )}
      {availableTime && (
        <div>{`사용 가능 시간: ${convertToTimeFormat(availableTime.start)} 부터 ${convertToTimeFormat(availableTime.end)} 까지`}</div>
      )}
    </Styled.CouponItem>
  );
};

export default CouponItem;
