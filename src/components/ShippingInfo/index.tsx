import useRemoteAreaShipping from '../../hooks/useRemoteAreaShipping';
import CheckBox from '../common/CheckBox';

import * as C from '../common/commonStyles';
import * as S from './style';

export default function ShippingInfo() {
  const { isSelected, toggleSelected } = useRemoteAreaShipping();

  return (
    <S.Wrapper>
      <C.SubTitle>배송 정보</C.SubTitle>
      <CheckBox
        label="제주도 및 도서 산간 지역"
        isSelected={isSelected}
        handleChange={toggleSelected}
      />
    </S.Wrapper>
  );
}
