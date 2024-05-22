import { useId } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import * as S from './styled';

const IsolatedRegionShippingFee = () => {
  const id = useId();

  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <S.CheckBoxField>
        <Checkbox id={id} isChecked onChange={() => console.log('hello')} />
        <S.CheckboxLabel>제주도 및 도서 산간 지역</S.CheckboxLabel>
      </S.CheckBoxField>
    </S.Container>
  );
};

export default IsolatedRegionShippingFee;
