import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  flex-direction: column;
  gap: 24px;

  overflow-y: auto;

  & > * {
    border-top: 1px solid var(--color-gray);
  }
`;
