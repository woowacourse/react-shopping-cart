import { useId } from 'react';
import * as S from './styled';

import Checkbox from '@components/common/Checkbox/Checkbox';

interface IsolatedRegionShippingFeeProps {
  isolatedRegion: boolean;
  handleIsolatedRegion: () => void;
}

const IsolatedRegionShippingFee = ({
  isolatedRegion,
  handleIsolatedRegion,
}: IsolatedRegionShippingFeeProps) => {
  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>
      <S.CheckBoxField>
        <Checkbox id={useId()} isChecked={isolatedRegion} onChange={handleIsolatedRegion} />
        <S.CheckboxLabel>제주도 및 도서 산간 지역</S.CheckboxLabel>
      </S.CheckBoxField>
    </S.Container>
  );
};

export default IsolatedRegionShippingFee;
