import styled from "styled-components";

export const CartHeaderTitle = styled.span`
  ${({ theme }) => theme.TEXT.Title};
`;

export const CartPageLayout = styled.div`
  padding: 36px 24px 0px 24px;
  height: calc(100vh - 128px);

  overflow-y: scroll;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;

export const OrderConfirmButton = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  margin: 0;
`;
