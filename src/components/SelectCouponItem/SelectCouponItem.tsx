import Checkbox from '../common/Checkbox/Checkbox';
import { Divider } from '../common/Divider/Divider.style';
import Text from '../common/Text/Text';
import * as S from './SelectCouponItem.style';

const SelectCouponItem = () => {
  return (
    <S.SelectCouponItem>
      <Divider />
      <S.CheckboxContainer>
        <Checkbox state={false} handleClick={() => {}} />
        <Text size="m">5,000원 할인 쿠폰</Text>
      </S.CheckboxContainer>
      <S.DescriptionContainer>
        <Text size="s" weight="s">
          최소 주문 금액: 100,000원
        </Text>
        <Text size="s" weight="s">
          만료일: 2024년 11월 30일
        </Text>
      </S.DescriptionContainer>
    </S.SelectCouponItem>
  );
};

export default SelectCouponItem;
