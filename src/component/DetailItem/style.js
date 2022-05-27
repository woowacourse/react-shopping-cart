import {FlexColumn, FlexRow, Font} from 'style/common';
import styled from 'styled-components';

const DetailItemLayout = styled(FlexColumn)`
  align-items: center;
  width: 640px;
`;

const ItemNameSpan = styled.span`
  display: flex;
  align-items: flex-start;
  width: 570px;

  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.BLACK};

  margin-top: 21px;
`;

const ItemPriceBox = styled(FlexRow)`
  align-items: center;
  justify-content: space-between;

  font-size: 24px;

  width: 100%;
  height: 60px;

  margin-top: 33px;
  margin-bottom: 10px;
  padding: 0 20px;

  border-top: ${({theme}) => `4px solid ${theme.GRAY_700}`};
`;

const PriceFont = styled(Font)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;
export {DetailItemLayout, ItemNameSpan, ItemPriceBox, PriceFont};
