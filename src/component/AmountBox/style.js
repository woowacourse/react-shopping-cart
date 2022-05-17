import {FlexRow} from 'style/common';
import styled from 'styled-components';

const AmountBoxLayout = styled.div`
  box-sizing: border-box;

  width: 448px;
  height: 318px;

  border: ${({theme}) => `1px solid ${theme.GRAY_500}`};
  padding: 30px;
`;

const AmountBoxHeader = styled.div`
  width: 100%;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: ${({theme}) => `3px solid ${theme.GRAY_500}`};
`;

const PriceInfoBox = styled(FlexRow)`
  justify-content: space-between;
  margin: 34px 0 68px;

  & p {
    font-size: 20px;
    font-weight: 700;
    background-size: 0% 50%;
    background: ${({theme}) => `linear-gradient(to top, ${theme.MINT} 50%, transparent 50%)`};
  }
`;

export {AmountBoxLayout, AmountBoxHeader, PriceInfoBox};
