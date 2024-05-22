import * as S from './style';

import CheckBox from '../../../components/CheckBox/CheckBox';

export default function DeliveryInfo() {
  return (
    <S.Container>
      <S.Title>배송정보</S.Title>

      <S.CheckItem>
        <CheckBox isChecked={false} />
        <p>제주도 및 도서 산간 지역</p>
      </S.CheckItem>
    </S.Container>
  );
}
