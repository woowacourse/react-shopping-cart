import styled from '@emotion/styled';

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
