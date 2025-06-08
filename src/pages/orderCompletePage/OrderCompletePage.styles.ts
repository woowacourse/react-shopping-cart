import { css } from '@emotion/react';

export const OrderCompleteWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
`;

export const OrderCompleteTitle = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export const OrderCompleteDescription = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;

export const OrderCompleteSubtitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

export const OrderCompletePriceContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
`;

export const OrderCompleteTotalPrice = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export const CartTitleContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  gap: 1.2rem;
`;

export const CartPageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 3.6rem;
`;

export const CartCheckboxContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  width: 100%;
  gap: 0.45rem;
`;

export const DeliveryInfoContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1.6rem;
  margin-top: 3.2rem;
`;

export const DeliveryInfoTitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

export const DeliveryDifficultArea = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;

export const DeliveryInfoCheckboxContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  gap: 0.8rem;
`;

export const InfoMessageContainer = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
`;

export const CartPriceInfoContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartPriceSubtitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

export const SelectedCouponContainer = css`
  padding: 16px;
  background-color: var(--color-light-grey, #f8f9fa);
  border-radius: 8px;
  border: 1px solid var(--color-grey, #dee2e6);
  margin: 16px 0;
`;

export const SelectedCouponTitle = css`
  font-size: 14px;
  font-weight: bold;
  color: var(--color-black);
  margin: 0 0 8px 0;
`;

export const SelectedCouponInfo = css`
  font-size: 14px;
  color: var(--color-black);
  margin: 0;

  strong {
    color: var(--color-primary, #007bff);
  }
`;

export const DialogHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-light-grey);
  width: 100%;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: var(--color-black);
  }
`;

export const CloseButton = css`
  font-size: 20px;
  color: var(--color-grey);
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }
`;

export const DialogContent = css`
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
`;

export const DialogActions = css`
  padding: 16px;
  border-top: 1px solid var(--color-light-grey);
  margin-top: 20px;
`;

export const TriggerButton = css`
  width: 100%;
  padding: 12px 0;
  background-color: var(--color-black);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--color-dark-grey);
  }

  &:disabled {
    background-color: var(--color-grey);
    color: var(--color-white);
    cursor: not-allowed;
  }
`;
