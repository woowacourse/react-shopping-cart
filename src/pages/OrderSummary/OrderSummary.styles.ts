import { css } from "@emotion/react";

export const Container = css`
  min-height: var(--min-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
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
