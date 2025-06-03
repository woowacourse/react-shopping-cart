import styled from "@emotion/styled";

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0;
  flex-grow: 1;
  gap: 20px;
`;

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: 400px;
  padding-right: 12px;
`;
