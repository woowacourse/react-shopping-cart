import styled from '@emotion/styled';

const ShoppingCartItemRow = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const ShoppingCartItemOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const ShoppingCartItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
`;

export { ShoppingCartItemRow, ShoppingCartItemOption, ShoppingCartItemContainer };
