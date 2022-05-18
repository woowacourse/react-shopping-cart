import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';

const CartItemLayout = styled(FlexRow)`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const ItemNameParagraph = styled.p`
  width: 100%;
`;

const EditQuantityBox = styled(FlexColumn)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  width: 115px;
`;

const PriceSpan = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

export {CartItemLayout, EditQuantityBox, ItemNameParagraph, PriceSpan};
