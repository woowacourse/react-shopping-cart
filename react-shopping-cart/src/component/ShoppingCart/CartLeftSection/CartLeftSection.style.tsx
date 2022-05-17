import styled from "styled-components";

export const CartLeftSectionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CartItemsContainerHeader = styled.div`
  font-size: 13px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 2px solid;
  border-color: ${({ theme }) => theme.colors["gray_01"]};
`;
