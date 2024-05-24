import { useId } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { isolatedRegionStore } from '../../recoil/atoms';

const IsolatedRegionShippingFee = () => {
  const id = useId();
  const [isolatedRegion, setIsolatedRegion] = useRecoilState(isolatedRegionStore);

  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <S.CheckBoxField>
        <Checkbox
          id={id}
          isChecked={isolatedRegion}
          onChange={() => setIsolatedRegion(prev => !prev)}
        />
        <S.CheckboxLabel>제주도 및 도서 산간 지역</S.CheckboxLabel>
      </S.CheckBoxField>
    </S.Container>
  );
};

export default IsolatedRegionShippingFee;
