import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  flex-direction: column;
`;

export const InfoText = css`
  margin-bottom: 13px;

  display: flex;
  align-items: center;
  gap: 4px;

  font-size: var(--font-size-small);
`;

export const Table = css`
  width: 100%;
  line-height: 1.8;

  border-top: 1px solid var(--color-gray);
  border-collapse: collapse;

  & tr td {
  }

  & tr td:first-of-type {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-normal);
  }

  & tr td:last-child {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    text-align: end;
  }

  & tr:nth-of-type(3) td {
    border-top: 1px solid var(--color-gray);
  }
`;
