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

export {CartItemLayout, EditQuantityBox, ItemNameParagraph};
