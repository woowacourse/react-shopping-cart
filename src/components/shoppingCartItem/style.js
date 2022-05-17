import Button from 'components/base/button/Button';
import StyledText from 'components/base/text/style';
import styled from 'styled-components';

const ShoppingCartItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 0;
`;

const ShoppingCartItemBox = styled.div`
  display: flex;
  width: 90%;
`;

const ShoppingCartItemName = styled(StyledText)`
  padding: 10px;
  width: 280px;
`;

const ShoppingCartItemSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ShoppingCartItemQuantitybar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ShoppingCartItemQuantityDisplay = styled.div`
  color: black;
  width: 50px;
  height: 47px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShoppingCartItemQuantityButton = styled(Button)`
  color: black;
  border: 1px solid #dddddd;
  padding: 3px 10px;
`;

const ShoppingCartItemTotalPrice = styled.p`
  margin-top: 20px;
`;

export {
  ShoppingCartItemContainer,
  ShoppingCartItemBox,
  ShoppingCartItemName,
  ShoppingCartItemSidebar,
  ShoppingCartItemQuantitybar,
  ShoppingCartItemQuantityButton,
  ShoppingCartItemQuantityDisplay,
  ShoppingCartItemTotalPrice,
};
