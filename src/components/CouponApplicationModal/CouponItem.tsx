import CheckButton from '../common/CheckButton/CheckButton';
import * as Styled from './style';
import { AvailableType } from '../type';
import { convertToTimeFormat } from '../../util/coupon/convertToTimeFormat';
import { convertToDateFormat } from '../../util/coupon/convertToDateFormat';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  couponSelectedState,
  selectedCouponsSelector,
} from '../../recoil/coupons';
import { koMoneyFormat } from '../../util/common/koMoneyFormat';

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

  /**
   *
   * 두개의 쿠폰을 모두 선택했는지의 여부.
   * 총 2개의 쿠폰이 선택되고, 해당 쿠폰이 선택되지 않았다면 true return
   */

  const isDoubleCouponApplied =
    useRecoilValue(selectedCouponsSelector).length >= 2 && !couponSelected;

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
