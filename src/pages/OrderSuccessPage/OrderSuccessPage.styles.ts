import styled from '@emotion/styled';

export const OrderSuccessContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const OrderSuccessSection = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const OrderSuccessTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const OrderSuccessQuantity = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const OrderSuccessTotalPurchasePriceLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const OrderSuccessTotalPurchasePrice = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const OrderSuccessFooterContainer = styled.footer`
  width: 100%;
  height: 64px;
`;
