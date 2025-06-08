import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const OrderConfirmationPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderConfirmationPageContent = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 24px;
`;

export const CartListContainer = styled.section`
  width: 100%;
  max-height: 350px;
  overflow-y: scroll;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const CartItemInfoQuantity = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonCSS = css`
  width: 100%;
  height: 48px;
  font-size: 16px;
  border: 1px solid rgba(3, 3, 3, 0.25);
  border-radius: 5px;
  margin: 20px 0;

  transition: background-color 0.1s ease;

  &:hover {
    background-color: rgba(3, 3, 3, 0.05);
  }
`;
