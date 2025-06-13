import { css } from '@emotion/react';

export const Container = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px 20px;
  background-color: var(--color-white);
`;

export const ContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: center;
  max-width: 400px;
  width: 100%;
`;

export const IconContainer = css`
  margin-bottom: 24px;
`;

export const CheckIcon = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color-success, #28a745);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto;
`;

export const OrderSummaryContainer = css`
  margin: 32px 0;
  padding: 24px;
  background-color: var(--color-light-grey, #f8f9fa);
  border-radius: 12px;
  width: 100%;
`;

export const OrderSummaryText = css`
  font-size: 16px;
  color: var(--color-black);
  margin: 0 0 20px 0;
  line-height: 1.5;

  strong {
    color: var(--color-primary, #007bff);
    font-weight: bold;
  }
`;

export const FinalAmountContainer = css`
  padding-top: 16px;
  border-top: 1px solid var(--color-grey);
`;

export const FinalAmountLabel = css`
  font-size: 14px;
  color: var(--color-grey);
  margin: 0 0 8px 0;
`;

export const FinalAmount = css`
  font-size: 24px;
  font-weight: bold;
  color: var(--color-black);
  margin: 0;
`;

export const ThankYouMessage = css`
  margin-bottom: 40px;

  p {
    margin: 8px 0;
  }
`;

export const DeliveryInfo = css`
  font-size: 14px;
  color: var(--color-grey);
  margin: 0;
`;

export const ButtonContainer = css`
  width: 100%;
  max-width: 400px;
  margin-top: auto;
  padding-top: 20px;
`;
