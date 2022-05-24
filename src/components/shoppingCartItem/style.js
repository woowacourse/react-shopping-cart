import styled from 'styled-components';

import Button from 'components/base/button/Button';
import StyledText from 'components/base/text/style';

export const ShoppingCartItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ShoppingCartItemBox = styled.div`
  display: flex;
  width: 90%;
`;

export const ShoppingCartItemName = styled(StyledText)`
  padding: 10px;
  width: 280px;
`;

export const ShoppingCartItemSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ShoppingCartItemQuantitybar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ShoppingCartItemQuantityDisplay = styled.div`
  color: black;
  width: 50px;
  height: 47px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShoppingCartItemQuantityButton = styled(Button)`
  color: black;
  border: 1px solid #dddddd;
  padding: 3px 10px;
`;

export const ShoppingCartItemTotalPrice = styled.p`
  margin-top: 20px;
`;
