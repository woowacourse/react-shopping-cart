import { css } from '@emotion/react';

export default function SeparateLine() {
  return <span css={separateLine}></span>;
}

const separateLine = css`
  width: 100%;

  margin: 12px 0px;

  border-top: 1px solid #0000001a;
`;
