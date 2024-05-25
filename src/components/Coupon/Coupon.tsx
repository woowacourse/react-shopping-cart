import * as Styled from './style';

import { useRecoilState } from 'recoil';
import { isCouponSelectedState } from '../../recoil/atoms';

import Caption from '../Caption/Caption';
import Divider from '../Divider/Divider';
import SelectButton from '../SelectButton/SelectButton';
import SelectButtonContainer from '../SelectButtonContainer/SelectButtonContainer';
import { formatAvailableTime, formatExpirationDate } from '../../utils/utils';

import SelectedBox from '../../assets/SelectedBox.svg';
import UnSelectedBox from '../../assets/UnSelectedBox.svg';

import { CouponType } from '../../type';
import MESSAGE from '../../constants/Message';

interface CouponProps {
  inputCoupon: CouponType;
}

const Coupon = ({ inputCoupon }: CouponProps) => {
  const [isSelected, setIsSelected] = useRecoilState(
    isCouponSelectedState(inputCoupon.id),
  );

  return (
    <Styled.Coupon>
      <Divider />
      <SelectButtonContainer gap="narrow">
        <SelectButton
          handleOnClick={() => setIsSelected((prevBoolean) => !prevBoolean)}
        >
          <img
            src={isSelected ? SelectedBox : UnSelectedBox}
            alt={isSelected ? MESSAGE.selected : MESSAGE.unSelected}
          />
        </SelectButton>
        <Styled.SelectButtonText>
          {inputCoupon.description}
        </Styled.SelectButtonText>
      </SelectButtonContainer>
      <Caption>
        {`만료일: ${formatExpirationDate(inputCoupon.expirationDate)}`}
        <br />
        {inputCoupon.minimumAmount &&
          `최소 주문 금액: ${inputCoupon.minimumAmount.toLocaleString('ko-kr')}원`}
        {inputCoupon.availableTime &&
          `사용 가능 시간: ${formatAvailableTime(inputCoupon.availableTime.start, inputCoupon.availableTime.end)}`}
      </Caption>
    </Styled.Coupon>
  );
};

export default Coupon;
