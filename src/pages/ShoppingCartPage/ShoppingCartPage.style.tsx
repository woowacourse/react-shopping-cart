import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
  padding: 36px 24px;
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const SelectAllButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;

  p {
    font-size: 12px;
  }
`;

export const CartEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;

  img {
    width: 150px;
  }
`;
