import {FlexRow, Font} from 'style/common';
import styled from 'styled-components';

const ContentBoxLayout = styled.div`
  box-sizing: border-box;

  width: 448px;
  height: 318px;

  border: ${({theme}) => `1px solid ${theme.GRAY_500}`};
  padding: 30px;
`;

const ContentBoxHeader = styled.div`
  width: 100%;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: ${({theme}) => `3px solid ${theme.GRAY_500}`};
`;

const PriceInfoBox = styled(FlexRow)`
  justify-content: space-between;
  margin: 34px 0 68px;
`;

const PriceInfoFont = styled(Font)`
  font-size: 20px;
  font-weight: 700;
  font-family: 'Lato';
  background-size: 0% 50%;
  background: ${({theme}) => `linear-gradient(to top, ${theme.MINT} 50%, transparent 50%)`};
`;

export {ContentBoxLayout, ContentBoxHeader, PriceInfoBox, PriceInfoFont};
