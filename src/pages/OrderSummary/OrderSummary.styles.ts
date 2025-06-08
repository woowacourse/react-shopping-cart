import { css } from "@emotion/react";

export const Container = css`
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Title = css`
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  margin-bottom: 24px;
`;

export const Summary = css`
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-light);
  color: #0a0d13;
`;

export const TotalCostLabel = css`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const TotalCost = css`
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
`;

export const RedeemCouponButton = css`
  width: 100%;
  height: 48px;

  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 5px;

  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-gray);
`;
