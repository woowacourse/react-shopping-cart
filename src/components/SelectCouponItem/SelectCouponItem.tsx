import { toKoreanDate, toKoreanTime } from '../../utils/date';
import Checkbox from '../common/Checkbox/Checkbox';
import { Divider } from '../common/Divider/Divider.style';
import Text from '../common/Text/Text';
import * as S from './SelectCouponItem.style';

interface SelectCouponItemProps {
  coupon: Coupon;
}

const SelectCouponItem = ({ coupon }: SelectCouponItemProps) => {
  const { description, expirationDate, minimumAmount, availableTime } = coupon;
  return (
    <S.SelectCouponItem>
      <Divider />
      <S.CheckboxContainer>
        <Checkbox state={false} handleClick={() => {}} />
        <Text size="m">{description}</Text>
      </S.CheckboxContainer>
      <S.DescriptionContainer>
        <Text size="s" weight="s">
          {`만료일: ${toKoreanDate(expirationDate)}`}
        </Text>
        {minimumAmount ? (
          <Text size="s" weight="s">
            {`최소 주문 금액: ${minimumAmount.toLocaleString('ko-kr')}원`}
          </Text>
        ) : null}
        {availableTime ? (
          <Text size="s" weight="s">
            {`사용 가능 시간: ${toKoreanTime(availableTime.start)}부터 ${toKoreanTime(availableTime.end)}까지`}
          </Text>
        ) : null}
      </S.DescriptionContainer>
    </S.SelectCouponItem>
  );
};

export default SelectCouponItem;
