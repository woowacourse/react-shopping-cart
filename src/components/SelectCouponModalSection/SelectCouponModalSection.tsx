import * as S from './SelectCouponModalSection.style';

import SelectCouponItem from '../SelectCouponItem/SelectCouponItem';

import NOTICE from '../../assets/notice.svg?react';
import Text from '../common/Text/Text';

const SelectCouponModalSection = () => {
  return (
    <S.SelectCouponModalSection>
      <S.NoticeContainer>
        <NOTICE />
        <Text size="s" weight="m">
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </Text>
      </S.NoticeContainer>
      <S.SelectCouponItemContainer>
        <SelectCouponItem />
        <SelectCouponItem />
        <SelectCouponItem />
        <SelectCouponItem />
      </S.SelectCouponItemContainer>
    </S.SelectCouponModalSection>
  );
};

export default SelectCouponModalSection;
