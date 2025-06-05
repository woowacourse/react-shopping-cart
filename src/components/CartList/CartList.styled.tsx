import styled from "styled-components";

export const CartItemList = styled.ul`
  list-style: none;
  overflow-y: auto;
  height: calc(100vh - 504px);
`;

export const LoadingContent = styled.div`
  overflow-y: auto;
  height: calc(100vh - 504px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Description = styled.p`
  font-size: 12px;
  color: #666666;
  margin: 13px 0px;
`;
