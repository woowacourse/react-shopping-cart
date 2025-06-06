import { css } from "@emotion/react";

export const couponItemContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  border-top: 1px solid var(--color-grey);
  justify-content: flex-start;
  padding: 1.6rem 0;
  width: 100%;
`;

export const couponItemContainerInvalid = css`
  ${couponItemContainer}
  color: var(--color-grey);
  & * {
    color: inherit;
  }
`;

export const couponItemHeader = css`
  display: flex;
  width: 100%;
  gap: 0.8rem;
`;

export const couponItemInfoContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.8rem;
`;
