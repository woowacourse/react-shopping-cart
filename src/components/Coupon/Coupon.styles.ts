import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  flex-direction: column;
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
