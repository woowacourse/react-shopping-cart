import { FlexRow, WhiteSpace } from '@/style/common.style';

import CheckBox from '../Input/CheckBoxInput';
import { shippingAreaState } from '@/store/atoms';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';

const ShippingInfo = () => {
  const [isSelected, setIsSelected] = useState(false);
  const setShippingArea = useSetRecoilState(shippingAreaState);

  const handleClick = () => {
    setIsSelected(!isSelected);

    if (isSelected === false) setShippingArea('island');
    else setShippingArea('normal');
  };

  return (
    <StyledInfoWrapper>
      <StyledTitle>배송 정보</StyledTitle>
      <StyledBox>
        <CheckBox isSelected={isSelected} onClick={handleClick} />
        제주도 및 도서 산간 지역
      </StyledBox>
    </StyledInfoWrapper>
  );
};

export default ShippingInfo;

const StyledInfoWrapper = styled.div`
  ${WhiteSpace}
  margin: 10px 0;
`;

const StyledTitle = styled.h2`
  font-size: ${theme.fontSize.medium};
  font-weight: ${theme.fontWeight.bold};
`;

const StyledBox = styled.div`
  ${FlexRow}
  align-items: center;
  gap: 10px;
`;
