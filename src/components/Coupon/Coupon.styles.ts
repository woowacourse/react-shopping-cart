import { css } from "@emotion/react";

export const Container = (isDisabled: boolean) => css`
  display: flex;
  flex-direction: column;

  ${isDisabled && disabledContainer}
`;

export const disabledContainer = css`
  > * {
    opacity: 0.3;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const Header = css`
  display: flex;
  gap: 8px;
`;

export const Description = css`
  margin: 12px 0;

  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
`;

export const Details = css`
  display: flex;
  flex-direction: column;
  gap: 4px;

  font-size: var(--font-size-small);
  font-weight: var(--font-weight-normal);
`;
