import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = css`
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
`;

export const Subtitle = css`
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;

  white-space: pre-wrap;
`;
