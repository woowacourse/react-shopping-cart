import { css } from "@emotion/react";
import { fadeIn } from "../../animations/animations";

export const OrderCompleteWrapper = css`
  margin-top: 10rem;
`;

export const OrderCompleteContainer = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
export const OrderCompleteTitle = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export const OrderCompleteDescription = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  color: var(--color-dark-grey);
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
