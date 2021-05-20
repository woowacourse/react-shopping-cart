import styled from '@emotion/styled';

const Container = styled.div`
  border-top: 4px solid #aaaaaa;

  & > * {
    border-bottom: 1.5px solid #cccccc;
    padding: 20px;
  }
`;

const ShoppingCartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShoppingCartItemOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const ShoppingCartItem = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export {
  Container,
  ShoppingCartItemContainer,
  ShoppingCartItemOption,
  ShoppingCartItem,
};
