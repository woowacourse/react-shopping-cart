import { css } from '@emotion/react';

export const screenReaderOnly = css`
  position: absolute;

  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;

  overflow: hidden;
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;

export const labelTag = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const labelText = css`
  font-size: 12px;
  font-weight: 400;
`;

export const checkIcon = css`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;
