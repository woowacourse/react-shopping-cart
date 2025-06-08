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
