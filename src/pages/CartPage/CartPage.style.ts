import styled from "styled-components";

export const CartHeaderTitle = styled.span`
  ${({ theme }) => theme.TEXT.Title};
`;

export const CartItemListWrapper = styled.div`
  padding: 36px 24px 0px 24px;
  width: 100%;
  padding-bottom: 64px;
  overflow-y: scroll;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;
