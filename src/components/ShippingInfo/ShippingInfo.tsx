import * as Styled from './style';

import { useRecoilState } from 'recoil';
import { isCountrysideSelectedState } from '../../recoil/atoms';

import SelectedBox from '../../assets/SelectedBox.svg';
import UnSelectedBox from '../../assets/UnSelectedBox.svg';

import MESSAGE from '../../constants/Message';

const ShippingInfo = () => {
  const [isCountrysideSelected, setIsCountrysideSelected] = useRecoilState(
    isCountrysideSelectedState,
  );

  const handleSelectButtonOnClick = () => {
    setIsCountrysideSelected((prevBoolean) => !prevBoolean);
  };

  return (
    <Styled.ShippingInfo>
      <Styled.Title>배송 정보</Styled.Title>
      <Styled.SelectContainer>
        <Styled.SelectButton onClick={handleSelectButtonOnClick}>
          <img
            src={isCountrysideSelected ? SelectedBox : UnSelectedBox}
            alt={isCountrysideSelected ? MESSAGE.selected : MESSAGE.unSelected}
          />
        </Styled.SelectButton>
        <Styled.SelectMessage>제주도 및 도서 산간 지역</Styled.SelectMessage>
      </Styled.SelectContainer>
    </Styled.ShippingInfo>
  );
};

export default ShippingInfo;
