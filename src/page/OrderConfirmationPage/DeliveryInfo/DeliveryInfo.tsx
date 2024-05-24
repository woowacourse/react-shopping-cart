import * as S from './style';

import CheckBox from '../../../components/CheckBox/CheckBox';
import { isIslandOrMountain } from '../../../recoil/atoms';
import { useRecoilState } from 'recoil';

export default function DeliveryInfo() {
  const [isChecked, setIsChecked] = useRecoilState(isIslandOrMountain);
  const checkHandler = () => setIsChecked(!isChecked);
  return (
    <S.Container>
      <S.Title>배송정보</S.Title>

      <S.CheckItem>
        <CheckBox isChecked={isChecked} onClick={checkHandler} />
        <p>제주도 및 도서 산간 지역</p>
      </S.CheckItem>
    </S.Container>
  );
}
