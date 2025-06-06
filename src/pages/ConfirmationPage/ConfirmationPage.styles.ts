import styled from '@emotion/styled';

export const ConfirmationContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ConfirmationSection = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const ConfirmationTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const ConfirmationQuantity = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const ConfirmationTotalPurchasePriceLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const ConfirmationTotalPurchasePrice = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const ConfirmationFooterContainer = styled.footer`
  width: 100%;
  height: 64px;
`;
