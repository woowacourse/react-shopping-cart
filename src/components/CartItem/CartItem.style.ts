import styled from 'styled-components';

export const CartItem = styled.li`
  list-style: none;

  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;
`;

export const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ItemBody = styled.div`
  width: 100%;
  display: flex;
  column-gap: 20px;
`;

export const ItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  padding: 8px;
`;

export const ItemNameAndCost = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 4px;
`;
