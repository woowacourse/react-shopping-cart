import * as Styled from './style';

import SelectedBox from '../../assets/SelectedBox.svg';
import UnSelectedBox from '../../assets/UnSelectedBox.svg';

import MESSAGE from '../../constants/Message';
import { useState } from 'react';

const ShippingInfo = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Styled.ShippingInfo>
      <Styled.Title>배송 정보</Styled.Title>
      <Styled.SelectContainer>
        <Styled.SelectButton
          onClick={() => setIsSelected((prevBoolean) => !prevBoolean)}
        >
          <img
            src={isSelected ? SelectedBox : UnSelectedBox}
            alt={isSelected ? MESSAGE.selected : MESSAGE.unSelected}
          />
        </Styled.SelectButton>
        <Styled.SelectMessage>제주도 및 도서 산간 지역</Styled.SelectMessage>
      </Styled.SelectContainer>
    </Styled.ShippingInfo>
  );
};

export default ShippingInfo;
